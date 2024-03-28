import {CurrentUserStateType} from '../../store/slices/currentUserSlice';
import {FormikValues} from 'formik';
import {UserCreateParams, UserUpdateParams} from '../../types/api/users';
import {Currency} from '../../types/api/info';
import {LotCreate, imageUrl} from '../../types/api/lots';

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

export const getImagesData = (imageUrl: imageUrl[]) => {
  const imagesDataTemp = imageUrl.filter(element => element.imageURL != '');

  const imagesData = imagesDataTemp.map((image) => image.file)

  return imagesData;
};

export const transformValuesCreateLot: (
  values: FormikValues,
  weightArray: Array<DropdownArray>,
  currencyArray: Array<DropdownArray>,
  lengthArray: Array<DropdownArray>,
  countriesArray: Array<DropdownArray>,
  citiesArray: Array<DropdownArray>,
  packagingArray: Array<DropdownArray>,
  imageUrl: imageUrl[],
) => FormData = (
  values,
  weightArray,
  currencyArray,
  lengthArray,
  countriesArray,
  citiesArray,
  packagingArray,
  imageUrl,
) => {
  const lot: LotCreate = {
    category_id: Number(values.variety),
    total_price: Number(values.price),
    start_price: Number(values.start_price),
    expiration_days: Number(values.expiration_days),
    length_unit: lengthArray[Number(values.length_unit) - 1].label,
    title: values.title,
    quantity: Number(values.quantity),
    weight: weightArray[Number(values.unitOfWeight) - 1].label,
    location: {
      country: countriesArray[Number(values.country) - 1].label,
      region: citiesArray[Number(values.region) - 1].label,
    },
    description: values.description || '',
    size: Number(values.size),
    packaging: packagingArray[Number(values.packaging) - 1].label,
    currency: currencyArray[Number(values.currency) - 1].label,
  };

  const formData = new FormData();

  const lotdata = JSON.stringify(lot);
 
  formData.append(`lot`, lotdata);

  const imagesData = getImagesData(imageUrl);
  
  formData.append('images', JSON.stringify([]));

  imagesData.forEach((val, index) => {
    formData.append(`images[][${index}]`, val);
  });

  return formData;
};

export const transformValuesCreateUser = (
  values: Omit<UserValues, 'currency'>,
  imageUrl?: string,
): UserCreateParams => {
  const requestValues = {
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: Currency.USD,
    phoneNumber: values.phone || '',
  };

  return requestValues;
};

export const transformValuesEditUser = (
  values: UserValues,
  imageUrl?: string,
): UserUpdateParams => {
  const requestValues = {
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: values.currency,
    phoneNumber: values.phone || '',
  };

  return requestValues;
};

export const transformValuesChangeCurrency = (
  user: CurrentUserStateType,
  currency: Currency,
): UserUpdateParams => {
  const requestValues = {
    first_name: user.name,
    last_name: user.surname,
    preferred_currency: currency,
    phoneNumber: user.phone,
  };

  return requestValues;
};
