import {useFormikContext, useField} from 'formik';
import React, {useState} from 'react';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
import {DropDownPickerProps} from 'react-native-dropdown-picker';
import styles from './appDropDownInputStyles';
import {textTypographyStyles} from '../../../styles/textTypographyStyles';
import {FC} from 'react';

// TODO: fix types AppDropDownProps and props

export type AppDropDownProps = DropDownPickerProps<ValueType | null> & {
  multiple: false;
  name: string;
  value: any;
  schema?: {label: string; value: string};
  placeholder?: string;
  zIndex: number;
  defaultValue?: string;
  items: any;
};

const AppDropDown: FC<AppDropDownProps> = ({...props}) => {
  const [openProvider, setOpenProvider] = useState(false);
  const {setFieldValue} = useFormikContext();
  const {setFieldTouched} = useFormikContext();
  // @ts-ignore
  const [field] = useField(props);

  return (
    <DropDownPicker
      {...field}
      {...props}
      value={field.value}
      open={openProvider}
      showTickIcon={false}
      listMode="SCROLLVIEW"
      onChangeValue={() => setFieldValue(field.name, field.value)}
      setOpen={setOpenProvider}
      onClose={() => setFieldTouched(field.name, true)}
      setValue={val => {
        setFieldValue(field.name, val(val));
      }}
      multiple={false}
      style={[textTypographyStyles.MAIN_16_400, styles.input, props.style]}
      placeholderStyle={[styles.placeholder, textTypographyStyles.MAIN_16_400]}
      labelStyle={[textTypographyStyles.MAIN_16_400]}
      listItemContainerStyle={styles.option}
      listItemLabelStyle={textTypographyStyles.MAIN_18_400}
      dropDownContainerStyle={styles.dropdown}
    />
  );
};

export default AppDropDown;
