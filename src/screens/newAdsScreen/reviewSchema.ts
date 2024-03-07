import * as yup from 'yup';

export const ReviewSchema = yup.object({
    title: yup.string().required().min(3).max(40),
    description: yup.string().min(3).max(300),
    category: yup.string().required(),
    subcategory: yup.string().required(),
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .required()
      .moreThan(0, 'Quantity must be more than 0'),
    unitOfWeight: yup.number().required(),
    price: yup
      .number()
      .typeError('Price must be a number')
      .required()
      .moreThan(0, 'Price must be more than 0'),
    currency: yup
      .number()
      .typeError('Currency must be a number')
      .required()
      .moreThan(0, 'Currency must be more than 0'),
    country: yup.string().required(),
    region: yup.string().required(),
    size: yup.string().required(),
    packaging: yup.string().required(),
  });