import * as yup from 'yup';
import {regExp} from '../../utils/regularExpessions/regExp';

export const ReviewSchema = yup.object({
  name: yup.string().required().min(1).max(50),
  surname: yup.string().required().min(1).max(50),
  phone: yup
    .string()
    .required()
    .matches(regExp.phone, 'Phone number is not valid'),
});
