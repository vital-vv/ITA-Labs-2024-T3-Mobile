import {CurrentUserStateType} from '../../store/slices/currentUserSlice';
import {Cities, ImageRequest, LotCreate, UserCreate} from '../../types/api/api';
import {UserEdit} from '../../types/api/api';
import {FormikValues} from 'formik';

export type UserValues = {
  name: string;
  surname: string;
  phone?: string;
  currency?: string;
};

export type DropdownArray = {
  label: string,
  value: number,
}

export type imageUrl = {
  id: number, 
  imageURL: string, 
  file: 
    {uri: string,
     type: string,
      name: string}
}

export const getImagesData = (imageUrl: {id: number; imageURL: string; file: {};}[]) => {
  const imagesDataTemp = imageUrl.filter(element => element.imageURL != "")

  const imagesData = imagesDataTemp.map(function (image) {
    if (image.id == 0) {
      return {file: image.file, isMainImage: true}
    } 
    else return {file: image.file, isMainImage: false}
  });

  return imagesData
}

export const transformValuesCreateLot: (
  values: FormikValues,
  weightArray: Array<DropdownArray>,
  currencyArray: Array<DropdownArray>,
  lengthArray: Array<DropdownArray>,
  countriesArray: Array<DropdownArray>,
  citiesArray: Array<DropdownArray>,
  packagingArray: Array<DropdownArray>,
  imageUrl: {id: number;
              imageURL: string;
              file: {};}[]
) => FormData = (
  values, 
  weightArray, 
  currencyArray, 
  lengthArray, 
  countriesArray, 
  citiesArray, 
  packagingArray, 
  imageUrl) => {

  let formData = new FormData();

  const lot: LotCreate = {
      category_id: Number(values.variety),
      price_per_unit: Number(
        (Number(values.price) / Number(values.quantity)).toFixed(2),
      ),
      start_price: Number(values.start_price),
      expiration_days: Number(values.expiration_days),
      length_unit: lengthArray[Number(values.length_unit) - 1].label,
      title: values.title,
      quantity: Number(values.quantity),
      weight: weightArray[Number(values.unitOfWeight) - 1].label,
      location: {
        country: countriesArray[Number(values.country) - 1].label,
        region:
        citiesArray[Number(values.region) - 1].label,
      },
      description: values.description || '',
      status: 'active',
      size: Number(values.size),
      packaging: packagingArray[Number(values.packaging) - 1].label,
      currency:  currencyArray[Number(values.currency) - 1].label,
  };

  const lotdata = JSON.stringify(lot)
  formData.append('lot', lotdata);

  const imagesData = getImagesData(imageUrl);
  
  imagesData.forEach((val, index) => {
    formData.append(`images[${index}]`, val);
  });

  console.log(formData)

  return formData
};

export const transformValuesCreateUser: (
  values: UserValues,
  imageUrl?: string,
) => UserCreate = (values, imageUrl) => {
  const requestValues: UserCreate = {
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: 'USD',
    email: `${values.surname}@test.com`,
    role: 'user',
    phoneNumber: values.phone || '',
  };

  return requestValues;
};

export const transformValuesEditUser = (
  values: UserValues,
  imageUrl?: string,
): UserEdit => {
  const requestValues = {
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: values.currency || '',
    phoneNumber: values.phone || '',
  };

  return requestValues;
};

export const transformValuesChangeCurrency = (
  user: CurrentUserStateType,
  currency: string,
): UserEdit => {
  const requestValues = {
    first_name: user.name,
    last_name: user.surname,
    preferred_currency: currency,
    phoneNumber: user.phone,
  };

  return requestValues;
};
