import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { Not, Repository } from 'typeorm';

import { EnvironmentService } from 'src/engine/integrations/environment/environment.service';
import { StripeService } from 'src/engine/core-modules/billing/stripe/stripe.service';
import {
  BillingSubscription,
  SubscriptionInterval,
  SubscriptionStatus,
} from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { BillingSubscriptionItem } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { ProductPriceEntity } from 'src/engine/core-modules/billing/dto/product-price.entity';
import { User } from 'src/engine/core-modules/user/user.entity';
import { assert } from 'src/utils/assert';
import { UserWorkspaceService } from 'src/engine/core-modules/user-workspace/user-workspace.service';
import {
  FeatureFlagEntity,
  FeatureFlagKeys,
} from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { BillingService } from 'src/engine/core-modules/billing/billing.service';

export enum AvailableProduct {
  BasePlan = 'base-plan',
}

export enum WebhookEvent {
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  SETUP_INTENT_SUCCEEDED = 'setup_intent.succeeded',
}

@Injectable()
export class BillingWorkspaceService {
  protected readonly logger = new Logger(BillingService.name);
  constructor(
    private readonly stripeService: StripeService,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly environmentService: EnvironmentService,
    @InjectRepository(BillingSubscription, 'core')
    private readonly billingSubscriptionRepository: Repository<BillingSubscription>,
    @InjectRepository(FeatureFlagEntity, 'core')
    private readonly featureFlagRepository: Repository<FeatureFlagEntity>,
    @InjectRepository(BillingSubscriptionItem, 'core')
    private readonly billingSubscriptionItemRepository: Repository<BillingSubscriptionItem>,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async isBillingEnabledForWorkspace(workspaceId: string) {
    const isFreeAccessEnabled = await this.featureFlagRepository.findOneBy({
      workspaceId,
      key: FeatureFlagKeys.IsFreeAccessEnabled,
      value: true,
    });

    return (
      !isFreeAccessEnabled && this.environmentService.get('IS_BILLING_ENABLED')
    );
  }

  getProductStripeId(product: AvailableProduct) {
    if (product === AvailableProduct.BasePlan) {
      return this.environmentService.get('BILLING_STRIPE_BASE_PLAN_PRODUCT_ID');
    }
  }

  async getProductPrices(stripeProductId: string) {
    const productPrices =
      await this.stripeService.getProductPrices(stripeProductId);

    return this.formatProductPrices(productPrices.data);
  }

  formatProductPrices(prices: Stripe.Price[]) {
    const result: Record<string, ProductPriceEntity> = {};

    prices.forEach((item) => {
      const interval = item.recurring?.interval;

      if (!interval || !item.unit_amount) {
        return;
      }
      if (
        !result[interval] ||
        item.created > (result[interval]?.created || 0)
      ) {
        result[interval] = {
          unitAmount: item.unit_amount,
          recurringInterval: interval,
          created: item.created,
          stripePriceId: item.id,
        };
      }
    });

    return Object.values(result).sort((a, b) => a.unitAmount - b.unitAmount);
  }

  async getCurrentBillingSubscription(criteria: {
    workspaceId?: string;
    stripeCustomerId?: string;
  }) {
    const notCanceledSubscriptions =
      await this.billingSubscriptionRepository.find({
        where: { ...criteria, status: Not(SubscriptionStatus.Canceled) },
        relations: ['billingSubscriptionItems'],
      });

    assert(
      notCanceledSubscriptions.length <= 1,
      `More than one not canceled subscription for workspace ${criteria.workspaceId}`,
    );

    return notCanceledSubscriptions?.[0];
  }

  async getBillingSubscription(stripeSubscriptionId: string) {
    return this.billingSubscriptionRepository.findOneOrFail({
      where: { stripeSubscriptionId },
    });
  }

  async getStripeCustomerId(workspaceId: string) {
    const subscriptions = await this.billingSubscriptionRepository.find({
      where: { workspaceId },
    });

    return subscriptions?.[0]?.stripeCustomerId;
  }

  async getBillingSubscriptionItem(
    workspaceId: string,
    stripeProductId = this.environmentService.get(
      'BILLING_STRIPE_BASE_PLAN_PRODUCT_ID',
    ),
  ) {
    const billingSubscription = await this.getCurrentBillingSubscription({
      workspaceId,
    });

    if (!billingSubscription) {
      throw new Error(
        `Cannot find billingSubscriptionItem for product ${stripeProductId} for workspace ${workspaceId}`,
      );
    }

    const billingSubscriptionItem =
      billingSubscription.billingSubscriptionItems.filter(
        (billingSubscriptionItem) =>
          billingSubscriptionItem.stripeProductId === stripeProductId,
      )?.[0];

    if (!billingSubscriptionItem) {
      throw new Error(
        `Cannot find billingSubscriptionItem for product ${stripeProductId} for workspace ${workspaceId}`,
      );
    }

    return billingSubscriptionItem;
  }

  async computeBillingPortalSessionURL(
    workspaceId: string,
    returnUrlPath?: string,
  ) {
    const stripeCustomerId = await this.getStripeCustomerId(workspaceId);

    if (!stripeCustomerId) {
      return;
    }

    const frontBaseUrl = this.environmentService.get('FRONT_BASE_URL');
    const returnUrl = returnUrlPath
      ? frontBaseUrl + returnUrlPath
      : frontBaseUrl;

    const session = await this.stripeService.createBillingPortalSession(
      stripeCustomerId,
      returnUrl,
    );

    assert(session.url, 'Error: missing billingPortal.session.url');

    return session.url;
  }

  async updateBillingSubscription(user: User) {
    const billingSubscription = await this.getCurrentBillingSubscription({
      workspaceId: user.defaultWorkspaceId,
    });
    const newInterval =
      billingSubscription?.interval === SubscriptionInterval.Year
        ? SubscriptionInterval.Month
        : SubscriptionInterval.Year;
    const billingSubscriptionItem = await this.getBillingSubscriptionItem(
      user.defaultWorkspaceId,
    );
    const stripeProductId = this.getProductStripeId(AvailableProduct.BasePlan);

    if (!stripeProductId) {
      throw new Error('Stripe product id not found for basePlan');
    }
    const productPrices = await this.getProductPrices(stripeProductId);

    const stripePriceId = productPrices.filter(
      (price) => price.recurringInterval === newInterval,
    )?.[0]?.stripePriceId;

    await this.stripeService.updateBillingSubscriptionItem(
      billingSubscriptionItem,
      stripePriceId,
    );
  }

  async computeCheckoutSessionURL(
    user: User,
    priceId: string,
    successUrlPath?: string,
  ): Promise<string> {
    const frontBaseUrl = this.environmentService.get('FRONT_BASE_URL');
    const successUrl = successUrlPath
      ? frontBaseUrl + successUrlPath
      : frontBaseUrl;

    const quantity =
      (await this.userWorkspaceService.getWorkspaceMemberCount()) || 1;

    const stripeCustomerId = (
      await this.billingSubscriptionRepository.findOneBy({
        workspaceId: user.defaultWorkspaceId,
      })
    )?.stripeCustomerId;

    const session = await this.stripeService.createCheckoutSession(
      user,
      priceId,
      quantity,
      successUrl,
      frontBaseUrl,
      stripeCustomerId,
    );

    assert(session.url, 'Error: missing checkout.session.url');

    return session.url;
  }

  async deleteSubscription(workspaceId: string) {
    const subscriptionToCancel = await this.getCurrentBillingSubscription({
      workspaceId,
    });

    if (subscriptionToCancel) {
      await this.stripeService.cancelSubscription(
        subscriptionToCancel.stripeSubscriptionId,
      );
      await this.billingSubscriptionRepository.delete(subscriptionToCancel.id);
    }
  }

  async handleUnpaidInvoices(data: Stripe.SetupIntentSucceededEvent.Data) {
    const billingSubscription = await this.getCurrentBillingSubscription({
      stripeCustomerId: data.object.customer as string,
    });

    if (billingSubscription?.status === 'unpaid') {
      await this.stripeService.collectLastInvoice(
        billingSubscription.stripeSubscriptionId,
      );
    }
  }

  async upsertBillingSubscription(
    workspaceId: string,
    data:
      | Stripe.CustomerSubscriptionUpdatedEvent.Data
      | Stripe.CustomerSubscriptionCreatedEvent.Data
      | Stripe.CustomerSubscriptionDeletedEvent.Data,
  ) {
    const workspace = this.workspaceRepository.find({
      where: { id: workspaceId },
    });

    if (!workspace) {
      return;
    }

    await this.billingSubscriptionRepository.upsert(
      {
        workspaceId: workspaceId,
        stripeCustomerId: data.object.customer as string,
        stripeSubscriptionId: data.object.id,
        status: data.object.status,
        interval: data.object.items.data[0].plan.interval,
      },
      {
        conflictPaths: ['stripeSubscriptionId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    const billingSubscription = await this.getBillingSubscription(
      data.object.id,
    );

    await this.billingSubscriptionItemRepository.upsert(
      data.object.items.data.map((item) => {
        return {
          billingSubscriptionId: billingSubscription.id,
          stripeProductId: item.price.product as string,
          stripePriceId: item.price.id,
          stripeSubscriptionItemId: item.id,
          quantity: item.quantity,
        };
      }),
      {
        conflictPaths: ['billingSubscriptionId', 'stripeProductId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    await this.featureFlagRepository.delete({
      workspaceId,
      key: FeatureFlagKeys.IsFreeAccessEnabled,
    });
  }
}
