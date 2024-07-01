import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2Title, IconSettings } from 'twenty-ui';
import { z } from 'zod';

import { useCreateOneDatabaseConnection } from '@/databases/hooks/useCreateOneDatabaseConnection';
import { getForeignDataWrapperType } from '@/databases/utils/getForeignDataWrapperType';
import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsIntegrationDatabaseConnectionForm,
  settingsIntegrationPostgreSQLConnectionFormSchema,
  settingsIntegrationStripeConnectionFormSchema,
} from '@/settings/integrations/database-connection/components/SettingsIntegrationDatabaseConnectionForm';
import { useIsSettingsIntegrationEnabled } from '@/settings/integrations/hooks/useIsSettingsIntegrationEnabled';
import { useSettingsIntegrationCategories } from '@/settings/integrations/hooks/useSettingsIntegrationCategories';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { AppPath } from '@/types/AppPath';
import { SettingsPath } from '@/types/SettingsPath';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';
import { CreateRemoteServerInput } from '~/generated-metadata/graphql';

const createRemoteServerInputPostgresSchema =
  settingsIntegrationPostgreSQLConnectionFormSchema.transform<CreateRemoteServerInput>(
    (values) => ({
      foreignDataWrapperType: 'postgres_fdw',
      foreignDataWrapperOptions: {
        dbname: values.dbname,
        host: values.host,
        port: values.port,
      },
      userMappingOptions: {
        password: values.password,
        user: values.user,
      },
      schema: values.schema,
      label: values.label,
    }),
  );

type SettingsIntegrationNewConnectionPostgresFormValues = z.infer<
  typeof createRemoteServerInputPostgresSchema
>;

const createRemoteServerInputStripeSchema =
  settingsIntegrationStripeConnectionFormSchema.transform<CreateRemoteServerInput>(
    (values) => ({
      foreignDataWrapperType: 'stripe_fdw',
      foreignDataWrapperOptions: {
        api_key: values.api_key,
      },
      label: values.label,
    }),
  );

type SettingsIntegrationNewConnectionStripeFormValues = z.infer<
  typeof createRemoteServerInputStripeSchema
>;

type SettingsIntegrationNewConnectionFormValues =
  | SettingsIntegrationNewConnectionPostgresFormValues
  | SettingsIntegrationNewConnectionStripeFormValues;

export const SettingsIntegrationNewDatabaseConnection = () => {
  const { databaseKey = '' } = useParams();
  const navigate = useNavigate();

  const [integrationCategoryAll] = useSettingsIntegrationCategories();
  const integration = integrationCategoryAll.integrations.find(
    ({ from: { key } }) => key === databaseKey,
  );

  const { createOneDatabaseConnection } = useCreateOneDatabaseConnection();
  const { enqueueSnackBar } = useSnackBar();

  const isIntegrationEnabled = useIsSettingsIntegrationEnabled(databaseKey);

  const isIntegrationAvailable = !!integration && isIntegrationEnabled;

  useEffect(() => {
    if (!isIntegrationAvailable) {
      navigate(AppPath.NotFound);
    }
  }, [integration, databaseKey, navigate, isIntegrationAvailable]);

  const newConnectionSchema =
    databaseKey === 'postgresql'
      ? createRemoteServerInputPostgresSchema
      : createRemoteServerInputStripeSchema;

  const formConfig = useForm<SettingsIntegrationNewConnectionFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(newConnectionSchema),
  });

  if (!isIntegrationAvailable) return null;

  const settingsIntegrationsPagePath = getSettingsPagePath(
    SettingsPath.Integrations,
  );

  const canSave = formConfig.formState.isValid;

  const handleSave = async () => {
    const formValues = formConfig.getValues();

    try {
      const createdConnection = await createOneDatabaseConnection(
        newConnectionSchema.parse({
          ...formValues,
          foreignDataWrapperType: getForeignDataWrapperType(databaseKey),
        }),
      );

      const connectionId = createdConnection.data?.createOneRemoteServer.id;

      navigate(
        `${settingsIntegrationsPagePath}/${databaseKey}/${connectionId}`,
      );
    } catch (error) {
      enqueueSnackBar((error as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <FormProvider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...formConfig}
        >
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Integrations',
                  href: settingsIntegrationsPagePath,
                },
                {
                  children: integration.text,
                  href: `${settingsIntegrationsPagePath}/${databaseKey}`,
                },
                { children: 'New' },
              ]}
            />
            <SaveAndCancelButtons
              isSaveDisabled={!canSave}
              onCancel={() =>
                navigate(`${settingsIntegrationsPagePath}/${databaseKey}`)
              }
              onSave={handleSave}
            />
          </SettingsHeaderContainer>
          <Section>
            <H2Title
              title="Connect a new database"
              description="Provide the information to connect your database"
            />
            <SettingsIntegrationDatabaseConnectionForm
              databaseKey={databaseKey}
            />
          </Section>
        </FormProvider>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
