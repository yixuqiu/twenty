import { CurrencyCode } from '@/object-record/record-field/types/CurrencyCode';
import {
  FieldAddressValue,
  FieldBooleanValue,
  FieldCurrencyValue,
  FieldDateTimeValue,
  FieldEmailValue,
  FieldFullNameValue,
  FieldJsonValue,
  FieldLinksValue,
  FieldLinkValue,
  FieldMultiSelectValue,
  FieldNumberValue,
  FieldPhoneValue,
  FieldRatingValue,
  FieldRelationFromManyValue,
  FieldRelationToOneValue,
  FieldSelectValue,
  FieldTextValue,
  FieldUUidValue,
} from '@/object-record/record-field/types/FieldMetadata';

export type FieldTextDraftValue = string;
export type FieldNumberDraftValue = string;
export type FieldDateTimeDraftValue = string;
export type FieldPhoneDraftValue = string;
export type FieldEmailDraftValue = string;
export type FieldSelectDraftValue = string;
export type FieldMultiSelectDraftValue = string[];
export type FieldRelationDraftValue = string;
export type FieldRelationManyDraftValue = string[];
export type FieldLinkDraftValue = { url: string; label: string };
export type FieldLinksDraftValue = {
  primaryLinkLabel: string;
  primaryLinkUrl: string;
  secondaryLinks?: { label: string; url: string }[] | null;
};
export type FieldCurrencyDraftValue = {
  currencyCode: CurrencyCode;
  amount: string;
};
export type FieldFullNameDraftValue = { firstName: string; lastName: string };
export type FieldAddressDraftValue = {
  addressStreet1: string;
  addressStreet2: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressPostcode: string | null;
  addressCountry: string | null;
  addressLat: number | null;
  addressLng: number | null;
};
export type FieldJsonDraftValue = string;

export type FieldInputDraftValue<FieldValue> = FieldValue extends FieldTextValue
  ? FieldTextDraftValue
  : FieldValue extends FieldUUidValue
    ? FieldUUidValue
    : FieldValue extends FieldDateTimeValue
      ? FieldDateTimeDraftValue
      : FieldValue extends FieldNumberValue
        ? FieldNumberDraftValue
        : FieldValue extends FieldBooleanValue
          ? FieldBooleanValue
          : FieldValue extends FieldPhoneValue
            ? FieldPhoneDraftValue
            : FieldValue extends FieldEmailValue
              ? FieldEmailDraftValue
              : FieldValue extends FieldLinkValue
                ? FieldLinkDraftValue
                : FieldValue extends FieldLinksValue
                  ? FieldLinksDraftValue
                  : FieldValue extends FieldCurrencyValue
                    ? FieldCurrencyDraftValue
                    : FieldValue extends FieldFullNameValue
                      ? FieldFullNameDraftValue
                      : FieldValue extends FieldRatingValue
                        ? FieldRatingValue
                        : FieldValue extends FieldSelectValue
                          ? FieldSelectDraftValue
                          : FieldValue extends FieldMultiSelectValue
                            ? FieldMultiSelectDraftValue
                            : FieldValue extends FieldRelationToOneValue
                              ? FieldRelationDraftValue
                              : FieldValue extends FieldRelationFromManyValue
                                ? FieldRelationManyDraftValue
                                : FieldValue extends FieldAddressValue
                                  ? FieldAddressDraftValue
                                  : FieldValue extends FieldJsonValue
                                    ? FieldJsonDraftValue
                                    : never;
