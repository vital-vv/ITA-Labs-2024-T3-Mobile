import * as yup from 'yup';

const phoneRegExp = new RegExp('[+]375\\d{9}');

export const ReviewSchema = yup.object({
  name: yup.string().required().min(1).max(50),
  surname: yup.string().required().min(1).max(50),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid'),
});
