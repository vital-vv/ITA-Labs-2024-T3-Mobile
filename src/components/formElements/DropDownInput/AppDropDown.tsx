import { useFormikContext, useField, FormikTouched, FieldInputProps} from "formik";
import React, { useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {DropDownPickerProps} from "react-native-dropdown-picker";
import styles from './dropDownInputStyles'
import {textTypographyStyles} from '../../../styles/textTypographyStyles';
import {FC} from 'react';

export type AppDropDownProps = DropDownPickerProps & {
  schema?: { label: string; value: string; };
  name?: string;
  placeholder?: string;
  items?: any;
  zIndex?: number;
  defaultValue?: string;
  style: StyleProp<ViewStyle>;
};

const AppDropDown : FC<AppDropDownProps> = ({ ...props }) => {
  const [openProvider, setOpenProvider] = useState(false);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
      <DropDownPicker
        {...field}
        {...props}
        value={field.value}
        open={openProvider}
        showTickIcon={false}
        listMode="SCROLLVIEW"
        setOpen={setOpenProvider}
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