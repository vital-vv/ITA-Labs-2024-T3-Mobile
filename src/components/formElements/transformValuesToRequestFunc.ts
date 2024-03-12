import { LotCreate, UserCreate } from "../../types/api/api";
import { UserValues } from "../forms/PersonalDataForm";

export const transformValuesCreateLot: (values: any, weightArray: any, data: any, packagingArray: any) => void =
  (values, weightArray, data, packagingArray) => {
    const requestValues: LotCreate = {
      category_id: Number(values.category),
      price_per_unit: Number((Number(values.price) / Number(values.quantity)).toFixed(2)),
      length_unit: 'cm',
      title: values.title,
      quantity: Number(values.quantity),
      weight: (weightArray[Number(values.unitOfWeight)-1].label),
      location: {
        country: data.countries[Number(values.country) - 1].countryName,
        region: data.countries[Number(values.country) - 1].regions[
          Number(values.region) - 1
        ].regionName
      },
      description: values.description || '',
      status: 'active',
      variety: values.variety || '',
      size: Number(values.size),
      packaging: (packagingArray[Number(values.packaging)-1]['label']),
    };

    return requestValues;
  }

export const transformValuesCreateUser: (values: UserValues, imageUrl?: string) => void =
  (values, imageUrl) => {
    const requestValues: UserCreate = {
      first_name: values.name,
      last_name: values.surname,
      preferred_currency: 'USD',
      email: `${values.surname}@test.com`,
      role: 'user',
      phoneNumber: values.phone,
    };

    return requestValues;
  }