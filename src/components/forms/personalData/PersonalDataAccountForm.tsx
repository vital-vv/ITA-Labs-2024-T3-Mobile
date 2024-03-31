import {FC, useState} from 'react';
import {MainWrapper} from '../../mainWrapper/mainWrapper.tsx';
import {Formik, FormikState} from 'formik';
import {ReviewSchema} from '../ReviewSchema.ts';
import {
  Image,
  ScrollView,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {AppText} from '../../appText/appText.tsx';
import {Colors} from '../../../constants/colors.tsx';
import {TEXT_VARIANT} from '../../../types/textVariant.ts';
import {setMargin} from '../../../utils/styling/margin.ts';
import styles from './personalDataFormStyles.ts';
import {textTypographyStyles} from '../../../styles/textTypographyStyles.tsx';
import inputStyles from '../../formElements/Input/inputStyles.ts';
import ButtonWithoutIcon from '../../buttons/ButtonWithoutIcon/ButtonWithoutIcon.tsx';
import {
  AppImagePicker,
  AppImagePickerGetURI,
  ImagePickerAsset,
} from '../../AppImagePicker/AppImagePicker.tsx';
import Pencil from '../../../assets/icons/pencil.svg';
import {useEditUserMutation} from '../../../api/endpoints/index.ts';
import {transformValuesEditUser} from '../../../utils/helpers/transformValuesToRequestFunc.ts';
import {useAppSelector} from '../../../store/hooks/index.ts';
import {selector} from '../../../store/selector.ts';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const PersonalDataAccountForm: FC<Props> = ({style}) => {
  const user = useAppSelector(selector.currentUserSliceData);
  const [selectedImageInfo, setImageInfo] = useState<ImagePickerAsset>();
  const [imagePickerPreview, setImagePickerPreview] = useState<string>(
    user.photo,
  );
  const [editUserTrigger] = useEditUserMutation();

  const initialValues = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
  };

  type ResetForm = {
    resetForm: (
      nextState?: Partial<FormikState<typeof initialValues>> | undefined,
    ) => void;
  };

  const getUri: AppImagePickerGetURI = (imageInfo, __) => {
    setImageInfo(imageInfo);
    setImagePickerPreview(imageInfo.uri);
  };

  const onSubmit = async (
    values: typeof initialValues,
    {resetForm}: ResetForm,
  ) => {
    const requestData = transformValuesEditUser(
      {...values, currency: user.currency},
      selectedImageInfo,
    );
    try {
      await editUserTrigger(requestData);
    } finally {
      resetForm();
    }
  };

  return (
    <MainWrapper style={style}>
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
              {imagePickerPreview ? (
                <AppImagePicker
                  getUri={getUri}
                  noimage_style={styles.nophoto}
                  image_style={styles.photo}
                  imageUrl={imagePickerPreview}>
                  <Image
                    source={{uri: imagePickerPreview}}
                    style={styles.photo}
                  />
                </AppImagePicker>
              ) : (
                <AppImagePicker
                  getUri={getUri}
                  noimage_style={styles.nophoto}
                  image_style={styles.photo}>
                  <View style={styles.initials}>
                    {values.name != '' && (
                      <AppText
                        text={values.name[0].toUpperCase()}
                        color={Colors.WHITE}
                        variant={TEXT_VARIANT.MAIN_32_400}
                        style={{...setMargin(4, 0, 0, 0)}}
                      />
                    )}
                    {values.surname != '' && (
                      <AppText
                        text={values.surname[0].toUpperCase()}
                        color={Colors.WHITE}
                        variant={TEXT_VARIANT.MAIN_32_400}
                        style={{...setMargin(4, 0, 0, 0)}}
                      />
                    )}
                  </View>
                </AppImagePicker>
              )}
              <View style={styles.photo_edit}>
                <Pencil />
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
              placeholder="Name"
              keyboardType="default"
              defaultValue={values.name}
            />
            {touched.name && errors.name && (
              <AppText
                text={errors.name}
                color={Colors.ERROR_BASE}
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
              placeholder="Surname"
              keyboardType="default"
              defaultValue={values.surname}
            />
            {touched.surname && errors.surname && (
              <AppText
                text={errors.surname}
                color={Colors.ERROR_BASE}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              style={[
                textTypographyStyles.MAIN_16_400,
                inputStyles.input,
                inputStyles.disabled,
                {...setMargin(16, 0, 0, 0)},
              ]}
              text={values.email}
            />
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
                color={Colors.ERROR_BASE}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <ButtonWithoutIcon
              style={{...setMargin(16, 0, 0, 0)}}
              onPress={handleSubmit}
              disabled={!isValid}
              title="Save changes"
              type="dark"
            />
          </ScrollView>
        )}
      </Formik>
    </MainWrapper>
  );
};
