import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './dropDownInputStyles'

const DropdownInput = ({ options, onSelect, selectedValue, placeholder, optionName, optionId }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.input}>
        <Text style={styles.input_text}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.dropdown}>
          <ScrollView>
            {options.map((option, optionId) => (
              <TouchableOpacity
                key={optionId}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.option_text}>{option[optionName]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropdownInput;