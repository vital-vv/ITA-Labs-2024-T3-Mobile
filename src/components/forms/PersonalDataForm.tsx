import {FC, useState} from 'react';
import { MainWrapper } from '../mainWrapper/mainWrapper';
import {Formik, FormikProps} from 'formik';
import {ReviewSchema} from './ReviewSchema'
import { Pressable, ScrollView, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { AppText } from '../appText/appText';
import { Colors } from '../../constants/colors';
import { TEXT_VARIANT } from '../../types/textVariant';
import { setMargin } from '../../utils/styling/margin';
import { setPadding } from '../../utils/styling/padding';
import styles from './personalDataFormStyles'
import { textTypographyStyles } from '../../styles/textTypographyStyles';
import inputStyles from '../formElements/Input/inputStyles';
import ButtonWithoutIcon from '../buttons/ButtonWithoutIcon/ButtonWithoutIcon';
import { AppImagePicker } from '../AppImagePicker/AppImagePicker';
import Pensill from '../../assets/icons/pensill.svg';
import { useCreateUserMutation } from '../../api/endpoints/index.ts';
import { transformValuesCreateUser } from '../formElements/transformValuesToRequestFunc.ts'

type Props = {
  style?: StyleProp<ViewStyle>;
}

export const PersonalDataForm: FC<Props> = ({style}) => {

  const [usersInitials, setUsersInitials] = useState({name: '', surname: ''})
  const [imageUrl, setImageUrl] = useState('')
  const [createUser, {isError, error, isSuccess }] = useCreateUserMutation()
  
  const getUri = (id: number, val: string) => {
    setImageUrl(val)
  }

    return (
    <MainWrapper style={style}>
        <AppText
              text={'Personal Data'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_20_500}
              style={[{...setPadding(16, 16, 16, 16)}, styles.form_title]}
        />
        <Formik
        initialValues={{
          name: '',
          surname: '',
          phone: '',
        }}
        validationSchema={ReviewSchema}
        onSubmit={(values, {resetForm}) => {
          let newValues = transformValuesCreateUser(values);
          createUser(newValues);
        }}
        >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid
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
                { usersInitials.name != '' &&
                <AppText
                    text={usersInitials.name}
                    color={Colors.WHITE}
                    variant={TEXT_VARIANT.MAIN_32_400}
                    style={{...setMargin(4, 0, 0, 0)}}
                  />
                }
                { usersInitials.surname != '' &&
                  <AppText
                    text={usersInitials.surname}
                    color={Colors.WHITE}
                    variant={TEXT_VARIANT.MAIN_32_400}
                    style={{...setMargin(4, 0, 0, 0)}}
                  />
                }
                </View>
              </AppImagePicker>
              <View style={styles.photo_edit}>
                <Pensill />
              </View>
            </View>
            <TextInput
              style={[textTypographyStyles.MAIN_16_400, inputStyles.input, {...setMargin(16, 0, 0, 0)}]}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              onEndEditing={() => { if (values.name) {setUsersInitials({...usersInitials, name: `${values.name[0].toUpperCase()}`})}}}
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
              style={[textTypographyStyles.MAIN_16_400, inputStyles.input, {...setMargin(16, 0, 0, 0)}]}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              onEndEditing={() => { if (values.surname) {setUsersInitials({...usersInitials, surname: `${values.surname[0].toUpperCase()}`})}}}
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
              style={[textTypographyStyles.MAIN_16_400, inputStyles.input, {...setMargin(16, 0, 0, 0)}]}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder='Phone. For example: (99)-999-99-99'
              keyboardType='phone-pad'
            />
            {touched.phone && errors.phone && (
              <AppText
                text={errors.phone}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            {(isValid) ? (
             <ButtonWithoutIcon
                  style={{...setMargin(16, 0, 0, 0)}}
                  onPress={handleSubmit}
                  title="Save changes"
                  type="dark"
                />) : 
                <ButtonWithoutIcon
                style={{...setMargin(16, 0, 0, 0)}}
                disabled={true}
                title="Save changes"
                type="dark"
              />
            }
        </ScrollView>
        )}
        </Formik>
    </MainWrapper>
    )

}