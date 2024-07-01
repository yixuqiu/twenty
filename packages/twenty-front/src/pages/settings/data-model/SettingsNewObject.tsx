import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2Title, IconSettings } from 'twenty-ui';
import { z } from 'zod';

import { useCreateOneObjectMetadataItem } from '@/object-metadata/hooks/useCreateOneObjectMetadataItem';
import { getObjectSlug } from '@/object-metadata/utils/getObjectSlug';
import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsDataModelObjectAboutForm,
  settingsDataModelObjectAboutFormSchema,
} from '@/settings/data-model/objects/forms/components/SettingsDataModelObjectAboutForm';
import { settingsCreateObjectInputSchema } from '@/settings/data-model/validation-schemas/settingsCreateObjectInputSchema';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

const newObjectFormSchema = settingsDataModelObjectAboutFormSchema;

type SettingsDataModelNewObjectFormValues = z.infer<typeof newObjectFormSchema>;

export const SettingsNewObject = () => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();

  const { createOneObjectMetadataItem, findManyRecordsCache } =
    useCreateOneObjectMetadataItem();

  const settingsObjectsPagePath = getSettingsPagePath(SettingsPath.Objects);

  const formConfig = useForm<SettingsDataModelNewObjectFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(newObjectFormSchema),
  });

  const canSave =
    formConfig.formState.isValid && !formConfig.formState.isSubmitting;

  const handleSave = async (
    formValues: SettingsDataModelNewObjectFormValues,
  ) => {
    try {
      const { data: response } = await createOneObjectMetadataItem(
        settingsCreateObjectInputSchema.parse(formValues),
      );

      navigate(
        response
          ? `${settingsObjectsPagePath}/${getObjectSlug(
              response.createOneObject,
            )}`
          : settingsObjectsPagePath,
      );

      await findManyRecordsCache();
    } catch (error) {
      enqueueSnackBar((error as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formConfig}>
      <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
        <SettingsPageContainer>
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Objects',
                  href: settingsObjectsPagePath,
                },
                { children: 'New' },
              ]}
            />
            <SaveAndCancelButtons
              isSaveDisabled={!canSave}
              onCancel={() => navigate(settingsObjectsPagePath)}
              onSave={formConfig.handleSubmit(handleSave)}
            />
          </SettingsHeaderContainer>
          <Section>
            <H2Title
              title="About"
              description="Name in both singular (e.g., 'Invoice') and plural (e.g., 'Invoices') forms."
            />
            <SettingsDataModelObjectAboutForm />
          </Section>
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    </FormProvider>
  );
};
