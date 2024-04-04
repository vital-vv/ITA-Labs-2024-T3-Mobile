import {ChangeEvent, FC, useState} from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from 'react-native';
import PasswordHidden from '../../assets/icons/password/passwordVisible.svg';
import PasswordVisible from '../../assets/icons/password/passwordVisible.svg';
import {styles} from './securedTextInputStyles';
import {Colors} from '../../constants/colors';

type Props = {
  placeholder?: string;
  initialSecurityState?: boolean;
  value?: string;
  onChangeText?: (e: string | ChangeEvent<TextInputChangeEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  textInputProps?: TextInputProps;
};

export const SecuredTextInput: FC<Props> = ({
  textInputProps,
  value,
  onChangeText,
  onBlur,
  placeholder,
  initialSecurityState = true,
}) => {
  const [isVisibleEntry, setIsVisibleEntry] = useState(initialSecurityState);
  const changePasswordVisibility = (event: GestureResponderEvent) => {
    setIsVisibleEntry(prevState => !prevState);
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input]}
        secureTextEntry={isVisibleEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...textInputProps}
        value={value}
        placeholder={placeholder}
      />
      <Pressable onPress={changePasswordVisibility} style={styles.inputIcon}>
        {isVisibleEntry ? (
          <PasswordVisible fill={Colors.AGROEX_MAIN} />
        ) : (
          <PasswordHidden fill={Colors.AGROEX_MAIN} />
        )}
      </Pressable>
    </View>
  );
};
