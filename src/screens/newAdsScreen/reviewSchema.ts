import * as yup from 'yup';

export const ReviewSchema = yup.object({
    title: yup.string().required().min(3).max(40),
    description: yup.string().min(3).max(300),
    category: yup.string().required(),
    subcategory: yup.string().required(),
    variety: yup.string().required(),
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
    fromSize: yup
      .number()
      .typeError('Size must be a number')
      .required()
      .moreThan(0, 'Size must be more than 0')
      .lessThan(1001, 'Size must be not more than 1000'),
    toSize: yup
      .number()
      .typeError('Size must be a number')
      .required()
      .moreThan(yup.ref('fromSize'), 'Size must be more than fromSize')
      .lessThan(1001, 'Size must be not more than 1000'),
    packaging: yup.string().required(),
    length_unit: yup.string().required(),
    start_price: yup
      .number()
      .typeError('Start price must be a number')
      .required('Start price is a required field')
      .moreThan(0, 'Start price must be more than 0')
      .lessThan(yup.ref('price'), 'Start price must be less than price'),
    expiration_days: yup
      .number()
      .typeError('Trading period must be a number')
      .required()
      .moreThan(0, 'Trading period must be more than 0')
      .lessThan(31, 'Trading period must be not more than 30'),
  });