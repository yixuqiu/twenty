import { Repository } from 'typeorm';

import {
  FeatureFlagEntity,
  FeatureFlagKeys,
} from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { RemoteServerType } from 'src/engine/metadata-modules/remote-server/remote-server.entity';
import {
  RemoteServerException,
  RemoteServerExceptionCode,
} from 'src/engine/metadata-modules/remote-server/remote-server.exception';

export const validateRemoteServerType = async (
  remoteServerType: RemoteServerType,
  featureFlagRepository: Repository<FeatureFlagEntity>,
  workspaceId: string,
) => {
  const featureFlagKey = getFeatureFlagKey(remoteServerType);

  const featureFlag = await featureFlagRepository.findOneBy({
    workspaceId,
    key: featureFlagKey,
    value: true,
  });

  const featureFlagEnabled = featureFlag && featureFlag.value;

  if (!featureFlagEnabled) {
    throw new RemoteServerException(
      `Type ${remoteServerType} is not supported.`,
      RemoteServerExceptionCode.INVALID_REMOTE_SERVER_INPUT,
    );
  }
};

const getFeatureFlagKey = (remoteServerType: RemoteServerType) => {
  switch (remoteServerType) {
    case RemoteServerType.POSTGRES_FDW:
      return FeatureFlagKeys.IsPostgreSQLIntegrationEnabled;
    case RemoteServerType.STRIPE_FDW:
      return FeatureFlagKeys.IsStripeIntegrationEnabled;
    default:
      throw new RemoteServerException(
        `Type ${remoteServerType} is not supported.`,
        RemoteServerExceptionCode.INVALID_REMOTE_SERVER_INPUT,
      );
  }
};
