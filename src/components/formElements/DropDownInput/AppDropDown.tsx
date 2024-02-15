import { useFormikContext, useField, FormikTouched, FieldInputProps} from "formik";
import React, { useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import DropDownPickerInterface from "react-native-dropdown-picker"
import {DropDownPickerProps} from "react-native-dropdown-picker";
import styles from './appDropDownInputStyles'
import {textTypographyStyles} from '../../../styles/textTypographyStyles';
import {FC} from 'react';

// export type DropDownPickerProps<T extends unknown> = DropDownPickerProps<T> 
// (alias) const DropDownPicker: (<T extends ValueType>(props: PropsWithoutRef<DropDownPickerProps<T>>) => 
// React.ReactElement) & DropDownPickerInterface


export type AppDropDownProps =  DropDownPickerProps<ValueType> & {
    items: any;
    name: string;
    schema: { label: string; value: string; }; 
    placeholder: string; 
    zIndex: number;
    defaultValue: string; 
}

const AppDropDown : FC<AppDropDownProps> = ({ ...props }) => {
  const [openProvider, setOpenProvider] = useState(false);
  const { setFieldValue } = useFormikContext();
  const { setFieldTouched } = useFormikContext();
  const [field] = useField(props);

  return (
      <DropDownPicker
        {...field}
        {...props}
        value={field.value}
        open={openProvider}
        showTickIcon={false}
        listMode="SCROLLVIEW"
        onChangeValue={()=>setFieldValue(field.name, field.value)}
        setOpen={setOpenProvider}
        onClose={()=>setFieldTouched(field.name, true)}
        setValue={(val) => {
          setFieldValue(field.name, val(val));
        }}
        style={[textTypographyStyles.MAIN_16_400,  styles.input, props.style]}
        placeholderStyle={[styles.placeholder, textTypographyStyles.MAIN_16_400]}
        labelStyle={[textTypographyStyles.MAIN_16_400]}
        listItemContainerStyle={styles.option}
        listItemLabelStyle={textTypographyStyles.MAIN_18_400}
        dropDownContainerStyle={styles.dropdown}
      />
  );
};

export default AppDropDown;