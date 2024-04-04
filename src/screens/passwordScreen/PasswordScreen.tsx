import React, {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Pressable, ScrollView, View} from 'react-native';
import {styles} from './passwordScreenStyles';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {Formik} from 'formik';
import {SecuredTextInput} from '../../components/securedTextInput/securedTextInput';
import {PasswordRequirementsList} from './formComponents/passwordRequirementsList';
import {
  FormValues,
  formInitialValues,
  passwordReviewSchema,
} from './formComponents/formParams';
import {
  forgotPasswordHandler,
  updateUserPassword,
} from './formComponents/passwordFormActions';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Password>;
export const PasswordScreen: FC<Props> = ({navigation, route}) => {
  return (
    <Formik
      validationSchema={passwordReviewSchema}
      initialValues={formInitialValues}
      onSubmit={updateUserPassword}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <SecuredTextInput
              placeholder={'Current password'}
              value={values.currentPassword}
              onChangeText={handleChange(FormValues.currentPassword)}
              onBlur={handleBlur(FormValues.currentPassword)}
            />
            <AppText
              style={styles.formErrors}
              text={`${
                (touched.currentPassword && errors.currentPassword) || ''
              }`}
            />
            <Pressable onPress={forgotPasswordHandler}>
              <AppText
                style={styles.forgotPassword}
                text={'Forgot your password?'}
              />
            </Pressable>
            <SecuredTextInput
              placeholder="New password"
              value={values.newPassword}
              onChangeText={handleChange(FormValues.newPassword)}
              onBlur={handleBlur(FormValues.newPassword)}
            />
            <AppText
              style={styles.formErrors}
              text={`${(touched.newPassword && errors.newPassword) || ''}`}
            />
            <SecuredTextInput
              placeholder={'Confirm new password'}
              value={values.confirmPassword}
              onChangeText={handleChange(FormValues.confirmPassword)}
              onBlur={handleBlur(FormValues.confirmPassword)}
            />
            <AppText
              style={styles.formErrors}
              text={`${
                (touched.confirmPassword && errors.confirmPassword) || ''
              }`}
            />
            <PasswordRequirementsList style={styles.passwordReq} />
          </View>
          <ButtonWithIcon
            onPress={handleSubmit}
            disabled={!isValid}
            variant={TEXT_VARIANT.MAIN_16_500}
            title={'Set new Password'}
          />
        </ScrollView>
      )}
    </Formik>
  );
};
