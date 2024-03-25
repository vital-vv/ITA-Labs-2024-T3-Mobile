import {FC, useState} from 'react';
import {MainWrapper} from '../mainWrapper/mainWrapper.tsx';
import {Formik, FormikProps, FormikState, FormikValues} from 'formik';
import {ReviewSchema} from './ReviewSchema.ts';
import {ScrollView, StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {AppText} from '../appText/appText.tsx';
import {Colors} from '../../constants/colors.tsx';
import {TEXT_VARIANT} from '../../types/textVariant.ts';
import {setMargin} from '../../utils/styling/margin.ts';
import {setPadding} from '../../utils/styling/padding.ts';
import styles from './personalDataFormStyles.ts';
import {textTypographyStyles} from '../../styles/textTypographyStyles.tsx';
import inputStyles from '../formElements/Input/inputStyles.ts';
import ButtonWithoutIcon from '../buttons/ButtonWithoutIcon/ButtonWithoutIcon.tsx';
import {AppImagePicker} from '../AppImagePicker/AppImagePicker.tsx';
import Pensil from '../../assets/icons/pensill.svg';
import {
  useCreateUserMutation,
  useLazyGetCurrentUserQuery,
} from '../../api/endpoints/index.ts';
import {transformValuesCreateUser} from '../formElements/transformValuesToRequestFunc.ts';
import {useAppNavigation} from '../../utils/hooks/useAppNavigation.tsx';
import {ROUTES} from '../../constants/routes.ts';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export type UserValues = {
  name: string;
  surname: string;
  phone: string;
};

type ResetForm = {
  resetForm: (nextState?: Partial<FormikState<UserValues>> | undefined) => void;
};

export const PersonalDataOnboardingForm: FC<Props> = ({style}) => {
  const [usersInitials, setUsersInitials] = useState<UserValues>({
    name: '',
    surname: '',
    phone: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useAppNavigation();
  const [createUserTrigger, {isLoading}] = useCreateUserMutation();
  const [getCurrentUserTrigger] = useLazyGetCurrentUserQuery();
  const initialValues = {
    name: '',
    surname: '',
    phone: '',
  };

  const getUri = (id: number, val: string) => {
    setImageUrl(val);
  };

  const checkValues = (param: string, values: FormikValues) => {
    switch (param) {
      case 'name':
        if (values.name) {
          setUsersInitials({
            ...usersInitials,
            name: `${values.name[0].toUpperCase()}`,
          });
        }
      case 'surname':
        if (values.surname) {
          setUsersInitials({
            ...usersInitials,
            surname: `${values.surname[0].toUpperCase()}`,
          });
        }
    }
  };

  const onSubmit = async (values: UserValues, {resetForm}: ResetForm) => {
    const newValues = transformValuesCreateUser(values);
    try {
      await createUserTrigger(newValues).unwrap();
      await getCurrentUserTrigger();
      navigation.navigate(ROUTES.HomeStack, {screen: ROUTES.Home});
    } finally {
      resetForm();
    }
  };

  return (
    <MainWrapper style={style}>
      <AppText
        text={'Personal Data'}
        color={Colors.PRIMARY}
        variant={TEXT_VARIANT.MAIN_20_500}
        style={[{...setPadding(16, 16, 16, 16)}, styles.form_title]}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={ReviewSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <View style={styles.image_container}>
              <AppImagePicker
                getUri={getUri}
                noimage_style={styles.nophoto}
                image_style={styles.photo}>
                <View style={styles.initials}>
                  {usersInitials.name != '' && (
                    <AppText
                      text={usersInitials.name}
                      color={Colors.WHITE}
                      variant={TEXT_VARIANT.MAIN_32_400}
                      style={{...setMargin(4, 0, 0, 0)}}
                    />
                  )}
                  {usersInitials.surname != '' && (
                    <AppText
                      text={usersInitials.surname}
                      color={Colors.WHITE}
                      variant={TEXT_VARIANT.MAIN_32_400}
                      style={{...setMargin(4, 0, 0, 0)}}
                    />
                  )}
                </View>
              </AppImagePicker>
              <View style={styles.photo_edit}>
                <Pensil />
              </View>
            </View>
            <TextInput
              style={[
                textTypographyStyles.MAIN_16_400,
                inputStyles.input,
                {...setMargin(16, 0, 0, 0)},
              ]}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              onEndEditing={() => {
                checkValues('name', values);
              }}
              placeholder="Name"
              keyboardType="default"
            />
            {touched.name && errors.name && (
              <AppText
                text={errors.name}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <TextInput
              style={[
                textTypographyStyles.MAIN_16_400,
                inputStyles.input,
                {...setMargin(16, 0, 0, 0)},
              ]}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              onEndEditing={() => {
                checkValues('surname', values);
              }}
              placeholder="Surname"
              keyboardType="default"
            />
            {touched.surname && errors.surname && (
              <AppText
                text={errors.surname}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <TextInput
              style={[
                textTypographyStyles.MAIN_16_400,
                inputStyles.input,
                {...setMargin(16, 0, 0, 0)},
              ]}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder="Phone. For example: +99-999-99-99"
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <AppText
                text={errors.phone}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <ButtonWithoutIcon
              style={{...setMargin(16, 0, 0, 0)}}
              onPress={handleSubmit}
              disabled={!isValid && true}
              title="Save changes"
              type="dark"
            />
          </ScrollView>
        )}
      </Formik>
    </MainWrapper>
  );
};
