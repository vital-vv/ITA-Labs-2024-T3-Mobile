import React, {Dispatch, FC} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import Bin from '../../assets/icons/close.svg';
import {styles} from './multiselectStyles';
import {Colors} from '../../constants/colors';

type Props = {
  data: {label: string; value: string}[];
  selected: string[];
  setSelected: Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
};

export const AppMultiSelect: FC<Props> = ({
  data,
  selected,
  setSelected,
  placeholder,
}) => {
  return (
    <View style={styles.wrapper}>
      <MultiSelect
        style={styles.dropdown}
        activeColor={Colors.SYSTEM_EXTRALIGHT}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        renderItem={item => (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
          </View>
        )}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <Bin color="black" width={15} height={15} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
