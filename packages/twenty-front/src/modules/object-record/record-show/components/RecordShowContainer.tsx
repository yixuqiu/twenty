import groupBy from 'lodash.groupby';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useLabelIdentifierFieldMetadataItem } from '@/object-metadata/hooks/useLabelIdentifierFieldMetadataItem';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { formatFieldMetadataItemAsColumnDefinition } from '@/object-metadata/utils/formatFieldMetadataItemAsColumnDefinition';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import {
  FieldContext,
  RecordUpdateHook,
  RecordUpdateHookParams,
} from '@/object-record/record-field/contexts/FieldContext';
import { RecordInlineCell } from '@/object-record/record-inline-cell/components/RecordInlineCell';
import { PropertyBox } from '@/object-record/record-inline-cell/property-box/components/PropertyBox';
import { PropertyBoxSkeletonLoader } from '@/object-record/record-inline-cell/property-box/components/PropertyBoxSkeletonLoader';
import { InlineCellHotkeyScope } from '@/object-record/record-inline-cell/types/InlineCellHotkeyScope';
import { RecordDetailDuplicatesSection } from '@/object-record/record-show/record-detail-section/components/RecordDetailDuplicatesSection';
import { RecordDetailRelationSection } from '@/object-record/record-show/record-detail-section/components/RecordDetailRelationSection';
import { recordLoadingFamilyState } from '@/object-record/record-store/states/recordLoadingFamilyState';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { recordStoreIdentifierFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreIdentifierSelector';
import { isFieldCellSupported } from '@/object-record/utils/isFieldCellSupported';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';
import { ShowPageContainer } from '@/ui/layout/page/ShowPageContainer';
import { ShowPageLeftContainer } from '@/ui/layout/show-page/components/ShowPageLeftContainer';
import { ShowPageRightContainer } from '@/ui/layout/show-page/components/ShowPageRightContainer';
import { ShowPageSummaryCard } from '@/ui/layout/show-page/components/ShowPageSummaryCard';
import { ShowPageRecoilScopeContext } from '@/ui/layout/states/ShowPageRecoilScopeContext';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import {
  FieldMetadataType,
  FileFolder,
  useUploadImageMutation,
} from '~/generated/graphql';
import { isDefined } from '~/utils/isDefined';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

type RecordShowContainerProps = {
  objectNameSingular: string;
  objectRecordId: string;
  loading: boolean;
  isInRightDrawer?: boolean;
};

export const RecordShowContainer = ({
  objectNameSingular,
  objectRecordId,
  loading,
  isInRightDrawer = false,
}: RecordShowContainerProps) => {
  const { objectMetadataItem } = useObjectMetadataItem({
    objectNameSingular,
  });

  const { labelIdentifierFieldMetadataItem } =
    useLabelIdentifierFieldMetadataItem({
      objectNameSingular,
    });

  const [recordLoading] = useRecoilState(
    recordLoadingFamilyState(objectRecordId),
  );

  const [recordFromStore] = useRecoilState(
    recordStoreFamilyState(objectRecordId),
  );

  const recordIdentifier = useRecoilValue(
    recordStoreIdentifierFamilySelector({
      objectNameSingular,
      recordId: objectRecordId,
    }),
  );

  const [uploadImage] = useUploadImageMutation();
  const { updateOneRecord } = useUpdateOneRecord({ objectNameSingular });

  const useUpdateOneObjectRecordMutation: RecordUpdateHook = () => {
    const updateEntity = ({ variables }: RecordUpdateHookParams) => {
      updateOneRecord?.({
        idToUpdate: variables.where.id as string,
        updateOneRecordInput: variables.updateOneRecordInput,
      });
    };

    return [updateEntity, { loading: false }];
  };

  const onUploadPicture = async (file: File) => {
    if (objectNameSingular !== 'person') {
      return;
    }

    const result = await uploadImage({
      variables: {
        file,
        fileFolder: FileFolder.PersonPicture,
      },
    });

    const avatarUrl = result?.data?.uploadImage;

    if (!avatarUrl || isUndefinedOrNull(updateOneRecord) || !recordFromStore) {
      return;
    }

    await updateOneRecord({
      idToUpdate: objectRecordId,
      updateOneRecordInput: {
        avatarUrl,
      },
    });
  };

  const availableFieldMetadataItems = objectMetadataItem.fields
    .filter(
      (fieldMetadataItem) =>
        isFieldCellSupported(fieldMetadataItem) &&
        fieldMetadataItem.id !== labelIdentifierFieldMetadataItem?.id,
    )
    .sort((fieldMetadataItemA, fieldMetadataItemB) =>
      fieldMetadataItemA.name.localeCompare(fieldMetadataItemB.name),
    );

  const { inlineFieldMetadataItems, relationFieldMetadataItems } = groupBy(
    availableFieldMetadataItems,
    (fieldMetadataItem) =>
      fieldMetadataItem.type === FieldMetadataType.Relation
        ? 'relationFieldMetadataItems'
        : 'inlineFieldMetadataItems',
  );

  const isReadOnly = objectMetadataItem.isRemote;
  const isMobile = useIsMobile() || isInRightDrawer;
  const isPrefetchLoading = useIsPrefetchLoading();

  const summary = (
    <>
      {isDefined(recordFromStore) && (
        <>
          <ShowPageSummaryCard
            id={objectRecordId}
            logoOrAvatar={recordIdentifier?.avatarUrl ?? ''}
            avatarPlaceholder={recordIdentifier?.name ?? ''}
            date={recordFromStore.createdAt ?? ''}
            loading={isPrefetchLoading || loading || recordLoading}
            title={
              <FieldContext.Provider
                value={{
                  entityId: objectRecordId,
                  recoilScopeId:
                    objectRecordId + labelIdentifierFieldMetadataItem?.id,
                  isLabelIdentifier: false,
                  fieldDefinition: {
                    type:
                      labelIdentifierFieldMetadataItem?.type ||
                      FieldMetadataType.Text,
                    iconName: '',
                    fieldMetadataId: labelIdentifierFieldMetadataItem?.id ?? '',
                    label: labelIdentifierFieldMetadataItem?.label || '',
                    metadata: {
                      fieldName: labelIdentifierFieldMetadataItem?.name || '',
                      objectMetadataNameSingular: objectNameSingular,
                    },
                    defaultValue:
                      labelIdentifierFieldMetadataItem?.defaultValue,
                  },
                  useUpdateRecord: useUpdateOneObjectRecordMutation,
                  hotkeyScope: InlineCellHotkeyScope.InlineCell,
                  isCentered: true,
                }}
              >
                <RecordInlineCell readonly={isReadOnly} />
              </FieldContext.Provider>
            }
            avatarType={recordIdentifier?.avatarType ?? 'rounded'}
            onUploadPicture={
              objectNameSingular === 'person' ? onUploadPicture : undefined
            }
          />
          <PropertyBox>
            {isPrefetchLoading ? (
              <PropertyBoxSkeletonLoader />
            ) : (
              inlineFieldMetadataItems.map((fieldMetadataItem, index) => (
                <FieldContext.Provider
                  key={objectRecordId + fieldMetadataItem.id}
                  value={{
                    entityId: objectRecordId,
                    maxWidth: 200,
                    recoilScopeId: objectRecordId + fieldMetadataItem.id,
                    isLabelIdentifier: false,
                    fieldDefinition: formatFieldMetadataItemAsColumnDefinition({
                      field: fieldMetadataItem,
                      position: index,
                      objectMetadataItem,
                      showLabel: true,
                      labelWidth: 90,
                    }),
                    useUpdateRecord: useUpdateOneObjectRecordMutation,
                    hotkeyScope: InlineCellHotkeyScope.InlineCell,
                  }}
                >
                  <RecordInlineCell
                    loading={loading || recordLoading}
                    readonly={isReadOnly}
                  />
                </FieldContext.Provider>
              ))
            )}
          </PropertyBox>
          <RecordDetailDuplicatesSection
            objectRecordId={objectRecordId}
            objectNameSingular={objectNameSingular}
          />
          {relationFieldMetadataItems?.map((fieldMetadataItem, index) => (
            <FieldContext.Provider
              key={objectRecordId + fieldMetadataItem.id}
              value={{
                entityId: objectRecordId,
                recoilScopeId: objectRecordId + fieldMetadataItem.id,
                isLabelIdentifier: false,
                fieldDefinition: formatFieldMetadataItemAsColumnDefinition({
                  field: fieldMetadataItem,
                  position: index,
                  objectMetadataItem,
                }),
                useUpdateRecord: useUpdateOneObjectRecordMutation,
                hotkeyScope: InlineCellHotkeyScope.InlineCell,
              }}
            >
              <RecordDetailRelationSection
                loading={isPrefetchLoading || loading || recordLoading}
              />
            </FieldContext.Provider>
          ))}
        </>
      )}
    </>
  );

  return (
    <RecoilScope CustomRecoilScopeContext={ShowPageRecoilScopeContext}>
      <ShowPageContainer>
        <ShowPageLeftContainer forceMobile={isInRightDrawer}>
          {!isMobile && summary}
        </ShowPageLeftContainer>
        {recordFromStore ? (
          <ShowPageRightContainer
            targetableObject={{
              id: objectRecordId,
              targetObjectNameSingular: objectMetadataItem?.nameSingular,
            }}
            timeline
            tasks
            notes
            emails
            isRightDrawer={isInRightDrawer}
            summary={summary}
            loading={isPrefetchLoading || loading || recordLoading}
          />
        ) : (
          <></>
        )}
      </ShowPageContainer>
    </RecoilScope>
  );
};
