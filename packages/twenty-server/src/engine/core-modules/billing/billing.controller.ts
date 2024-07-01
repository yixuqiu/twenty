import {
  Controller,
  Headers,
  Req,
  RawBodyRequest,
  Logger,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import {
  BillingWorkspaceService,
  WebhookEvent,
} from 'src/engine/core-modules/billing/billing.workspace-service';
import { StripeService } from 'src/engine/core-modules/billing/stripe/stripe.service';

@Controller('billing')
export class BillingController {
  protected readonly logger = new Logger(BillingController.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly billingWorkspaceService: BillingWorkspaceService,
  ) {}

  @Post('/webhooks')
  async handleWebhooks(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    if (!req.rawBody) {
      res.status(400).end();

      return;
    }
    const event = this.stripeService.constructEventFromPayload(
      signature,
      req.rawBody,
    );

    if (event.type === WebhookEvent.SETUP_INTENT_SUCCEEDED) {
      await this.billingWorkspaceService.handleUnpaidInvoices(event.data);
    }

    if (
      event.type === WebhookEvent.CUSTOMER_SUBSCRIPTION_CREATED ||
      event.type === WebhookEvent.CUSTOMER_SUBSCRIPTION_UPDATED ||
      event.type === WebhookEvent.CUSTOMER_SUBSCRIPTION_DELETED
    ) {
      const workspaceId = event.data.object.metadata?.workspaceId;

      if (!workspaceId) {
        res.status(404).end();

        return;
      }

      await this.billingWorkspaceService.upsertBillingSubscription(
        workspaceId,
        event.data,
      );
    }
    res.status(200).end();
  }
}
