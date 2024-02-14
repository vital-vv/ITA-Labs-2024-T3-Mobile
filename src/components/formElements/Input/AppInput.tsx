import {FC} from 'react';
import {StyleProp, TextInput} from 'react-native';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {TEXT_COLOR_VARIANT} from '../../../types/textColorVariant';
import {textTypographyStyles} from '../../../styles/textTypographyStyles';
import {textColorStyles} from '../../../styles/textColorStyles';
import styles from './inputStyles';
import {Colors} from '../../../constants/colors';
import { useFormikContext, useField } from "formik";

export type AppInputProps =  {
  variant?: TEXT_VARIANT;
  color?: TEXT_COLOR_VARIANT;
  onBlur?: Function;
  onChangeText?: Function;
  setValue?: Function;
  value: string;
  placeholder?: string;
  keyboardType?: "numeric"|"default";
  name:string;
};

export const AppInput: FC<AppInputProps> = ({
  variant = TEXT_VARIANT.MAIN_16_400,
  color = Colors.PRIMARY,
  name,
  onBlur,
  onChangeText,
  setValue,
  keyboardType = "numeric",
  placeholder,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <TextInput  {...field}
                {...props}
                value={field.value}
                setValue={(val) => {
                    setFieldValue(field.name, val());
                  }}
                style={[textTypographyStyles[variant], textColorStyles[color], styles.input]}
                keyboardType = {keyboardType}
                placeholder = {placeholder}
              />
  );
};
