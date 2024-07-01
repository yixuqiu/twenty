import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useIcons } from 'twenty-ui';

import { useFavorites } from '@/favorites/hooks/useFavorites';
import { useLabelIdentifierFieldMetadataItem } from '@/object-metadata/hooks/useLabelIdentifierFieldMetadataItem';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { findOneRecordForShowPageOperationSignatureFactory } from '@/object-record/record-show/graphql/operations/factories/findOneRecordForShowPageOperationSignatureFactory';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { isDefined } from '~/utils/isDefined';
import { capitalize } from '~/utils/string/capitalize';

export const useRecordShowPage = (
  propsObjectNameSingular: string,
  propsObjectRecordId: string,
) => {
  const {
    objectNameSingular: paramObjectNameSingular,
    objectRecordId: paramObjectRecordId,
  } = useParams();

  const objectNameSingular = propsObjectNameSingular || paramObjectNameSingular;
  const objectRecordId = propsObjectRecordId || paramObjectRecordId;

  if (!objectNameSingular || !objectRecordId) {
    throw new Error('Object name or Record id is not defined');
  }

  const { objectMetadataItem } = useObjectMetadataItem({ objectNameSingular });
  const { labelIdentifierFieldMetadataItem } =
    useLabelIdentifierFieldMetadataItem({ objectNameSingular });
  const { favorites, createFavorite, deleteFavorite } = useFavorites();
  const setEntityFields = useSetRecoilState(
    recordStoreFamilyState(objectRecordId),
  );
  const { getIcon } = useIcons();
  const headerIcon = getIcon(objectMetadataItem?.icon);
  const FIND_ONE_RECORD_FOR_SHOW_PAGE_OPERATION_SIGNATURE =
    findOneRecordForShowPageOperationSignatureFactory({ objectMetadataItem });
  const { record, loading } = useFindOneRecord({
    objectRecordId,
    objectNameSingular,
    recordGqlFields: FIND_ONE_RECORD_FOR_SHOW_PAGE_OPERATION_SIGNATURE.fields,
  });

  useEffect(() => {
    if (isDefined(record)) {
      setEntityFields(record);
    }
  }, [record, setEntityFields]);

  const correspondingFavorite = favorites.find(
    (favorite) => favorite.recordId === objectRecordId,
  );
  const isFavorite = isDefined(correspondingFavorite);

  const handleFavoriteButtonClick = async () => {
    if (!objectNameSingular || !record) return;

    if (isFavorite) {
      deleteFavorite(correspondingFavorite.id);
    } else {
      createFavorite(record, objectNameSingular);
    }
  };

  const labelIdentifierFieldValue =
    record?.[labelIdentifierFieldMetadataItem?.name ?? ''];
  const pageName =
    labelIdentifierFieldMetadataItem?.type === FieldMetadataType.FullName
      ? [
          labelIdentifierFieldValue?.firstName,
          labelIdentifierFieldValue?.lastName,
        ].join(' ')
      : isDefined(labelIdentifierFieldValue)
        ? `${labelIdentifierFieldValue}`
        : '';

  const pageTitle = pageName.trim()
    ? `${pageName} - ${capitalize(objectNameSingular)}`
    : capitalize(objectNameSingular);

  return {
    objectNameSingular,
    objectRecordId,
    headerIcon,
    loading,
    pageTitle,
    pageName,
    isFavorite,
    handleFavoriteButtonClick,
    record,
    objectMetadataItem,
  };
};
