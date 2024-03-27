import {CurrentUserStateType} from '../../store/slices/currentUserSlice';
import {FormikValues} from 'formik';
import {LotCreate} from '../../types/api/lots';
import {UserUpdateParams} from '../../types/api/users';
import {Currency} from '../../types/api/info';
import * as ImagePicker from 'react-native-image-picker';

export type UserValues = {
  name: string;
  surname: string;
  phone?: string;
  currency: Currency;
};

export type DropdownArray = {
  label: string;
  value: number;
};

export const transformValuesCreateLot: (
  values: FormikValues,
  weightArray: Array<DropdownArray>,
  data: any,
  packagingArray: Array<DropdownArray>,
) => LotCreate = (values, weightArray, data, packagingArray) => {
  const requestValues: LotCreate = {
    category_id: Number(values.category),
    price_per_unit: Number(
      (Number(values.price) / Number(values.quantity)).toFixed(2),
    ),
    length_unit: 'cm',
    title: values.title,
    quantity: Number(values.quantity),
    weight: weightArray[Number(values.unitOfWeight) - 1].label,
    location: {
      country: data.countries[Number(values.country) - 1].countryName,
      region:
        data.countries[Number(values.country) - 1].regions[
          Number(values.region) - 1
        ].regionName,
    },
    description: values.description || '',
    status: 'active',
    variety: values.variety || '',
    size: Number(values.size),
    packaging: packagingArray[Number(values.packaging) - 1].label,
  };

  return requestValues;
};

export const transformValuesCreateUser = (
  values: Omit<UserValues, 'currency'>,
  imageInfo?: ImagePicker.Asset,
) => {
  const userData = new FormData();
  const userInfoJSON = JSON.stringify({
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: Currency.USD,
    phoneNumber: values.phone,
  });
  const imageData = {
    uri: imageInfo?.uri,
    type: imageInfo?.type,
    name: imageInfo?.fileName,
  };
  userData.append('data', userInfoJSON);
  if (imageInfo) {
    userData.append('avatar', imageData);
  }
  return userData;
};

export const transformValuesEditUser = (
  values: UserValues,
  imageUrl?: string,
): UserUpdateParams => {
  const requestValues = {
    data: {
      first_name: values.name,
      last_name: values.surname,
      preferred_currency: values.currency,
      phoneNumber: values.phone || '',
    },
  };

  return requestValues;
};

export const transformValuesChangeCurrency = (
  user: CurrentUserStateType,
  currency: Currency,
): UserUpdateParams => {
  const requestValues = {
    data: {
      first_name: user.name,
      last_name: user.surname,
      preferred_currency: currency,
      phoneNumber: user.phone,
    },
  };

  return requestValues;
};
