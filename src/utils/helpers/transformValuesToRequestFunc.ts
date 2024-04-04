import {CurrentUserStateType} from '../../store/slices/currentUserSlice';
import {FormikValues} from 'formik';
import {Currency, Packaging, Weight} from '../../types/api/info';
import {LotCreate, imageUrl} from '../../types/api/lots';
import {ImagePickerAsset} from '../../components/AppImagePicker/AppImagePicker';
import {Bet} from '../../types/api/bids';

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
  const imagesData = imagesDataTemp.map(image => image.file);
  return imagesData;
};

export const transformValuesCreateLot = (
  values: FormikValues,
  weightArray: {
    label: Weight;
    value: number;
  }[],
  currencyArray: {
    label: Currency;
    value: number;
  }[],
  lengthArray: Array<DropdownArray>,
  countriesArray: Array<DropdownArray>,
  citiesArray: Array<DropdownArray>,
  packagingArray: {
    label: Packaging;
    value: number;
  }[],
  imageUrl: imageUrl[],
): FormData => {
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
    fromSize: Number(values.fromSize),
    toSize: Number(values.toSize),
    packaging: packagingArray[Number(values.packaging) - 1].label,
    currency: currencyArray[Number(values.currency) - 1].label,
  };

  const formData = new FormData();
  const lotdata = JSON.stringify(lot);
  formData.append('lot', lotdata);
  const imagesData = getImagesData(imageUrl);
  imagesData.forEach((val, index) => {
    formData.append('images', val);
  });

  return formData;
};

export const transformValuesCreateUser = (
  values: Omit<UserValues, 'currency'>,
  imageInfo?: ImagePickerAsset,
): FormData => {
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
  if (imageData.uri) {
    userData.append('avatar', imageData);
  } else {
    userData.append('avatar', null);
  }
  return userData;
};

export const transformValuesEditUser = (
  values: UserValues,
  imageInfo?: ImagePickerAsset,
): FormData => {
  const userData = new FormData();
  const userInfoJSON = JSON.stringify({
    first_name: values.name,
    last_name: values.surname,
    preferred_currency: values.currency,
    phoneNumber: values.phone,
  });
  const imageData = {
    uri: imageInfo?.uri,
    type: imageInfo?.type,
    name: imageInfo?.fileName,
  };
  userData.append('data', userInfoJSON);
  if (imageData.uri) {
    userData.append('newAvatar', imageData);
  } else {
    userData.append('newAvatar', null);
  }
  return userData;
};

export const transformValuesChangeCurrency = (
  user: CurrentUserStateType,
  currency: Currency,
): FormData => {
  const userData = new FormData();
  const userInfoJSON = JSON.stringify({
    first_name: user.name,
    last_name: user.surname,
    preferred_currency: currency,
    phoneNumber: user.phone,
  });
  userData.append('data', userInfoJSON);
  return userData;
};

export const transformValuesCreateBet = (
  bet: number,
  lot_id: number,
  currency: Currency,
): Bet => {
  const RequestBody = {
    lot_id: lot_id,
    amount: bet,
    currency: currency,
  };
  return RequestBody;
};
