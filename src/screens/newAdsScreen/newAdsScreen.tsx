import {View, TextInput, ScrollView, Button, Pressable, Modal, Image} from 'react-native';
import {AppText} from '../../components/appText/appText';
import {Colors} from '../../constants/colors';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../types/navigation.ts';
import {ROUTES} from '../../constants/routes.ts';
import { Field, Formik } from 'formik';
import { TEXT_VARIANT } from '../../types/textVariant.ts';
import {setMargin} from '../../utils/styling/margin.ts';
import styles from './newAdsScreenStyles.ts'
import data from './createLotData.json'
import inputStyles from '../../components/formElements/Input/inputStyles.ts';
import AppDropDown from '../../components/formElements/DropDownInput/AppDropDown.tsx';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import * as yup from 'yup';
import { LotPreview } from '../../components/lotPreview/LotPreview.tsx';
import ButtonWithoutIcon from '../../components/buttons/ButtonWithoutIcon/ButtonWithoutIcon.tsx';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon.tsx';
import StickyArrowLeftIcon from '../../assets/icons/sticky-arrow-left.svg';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import { ModalWindow } from '../../components/modal/modal.tsx';


type Props = NativeStackScreenProps<RootStackParams, ROUTES.NewAds>;

const ReviewSchema = yup.object({
  title: yup.string().required().min(3),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  quantity: yup.number().typeError('Quantity must be a number').required().moreThan(0, 'Quantity must be more than 0' ),
  unitOfWeight: yup.number().required(),
  price: yup.number().typeError('Price must be a number').required().moreThan(0, 'Price must be more than 0' ),
  currency: yup.number().typeError('Currency must be a number').required().moreThan(0, 'Currency must be more than 0' ),
  country: yup.string().required(),
  region: yup.string().required(),
  size:yup.string().required(),
  packaging: yup.string().required(),
});


export const NewAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isSuccessModalVisible, setisSuccessModalVisible] = useState(false);

  return (
    <MainWrapper >
      <AppText
        text={'New advertisement'}
        style={setPadding(16, 16, 16, 16)}
      />
      <Formik 
        initialValues={{
          title: '',
          category: '',
          subcategory: '',
          variety: '',
          quantity: '',
          unitOfWeight: '1',
          price: '',
          currency: '1',
          country: '',
          region: '',
          size: '',
          packaging: '',
        }}
        validationSchema={ReviewSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          setisSuccessModalVisible(true);
          }
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <ScrollView style={styles.container}>
            <AppText 
              text={'Title'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <TextInput
                style={[textTypographyStyles.MAIN_16_400, inputStyles.input]}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder="For example: My apples"
                keyboardType="default"
              />
            {touched.title && errors.title && <AppText 
              text={errors.title}
              color={Colors.ERROR}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(4, 0, 0, 0)}} />}
            <AppText 
              text={'Category'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 0, 0)}} />
            <AppText 
              text={'Select the category in which you want to submit your product. Your ad must match the theme.'}
              color={Colors.SECONDARY}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(8, 0, 16, 0)}} />
            <AppDropDown
                schema={{
                  label: 'name',
                  value: 'category_id'
                }} 
                name="category"
                placeholder="Select a category"
                items={data.categories}
                zIndex={2}
            />
            {touched.category && errors.category && <AppText 
              text={errors.category}
              color={Colors.ERROR}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(4, 0, 0, 0)}} />}
            {values.category &&
            <AppDropDown
                schema={{
                  label: 'name',
                  value: 'subcategory_id'
                }} 
                name="subcategory"
                placeholder="Select a product type"
                items={data.categories[Number(values.category)-1].subcategories}
                zIndex={2}
                style={{...setMargin(16, 0, 0, 0)}}
            />
            }
            {!values.category && 
              <AppText style={[styles.form_select, styles.form_disabled, {...setMargin(16, 0, 0, 0)}]}
                text={'Select a product type'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
               />
            }
            {touched.subcategory && errors.subcategory && 
              <AppText 
                text={errors.subcategory}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
                />}
            <AppText 
              text={'Quantity'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <View style={styles.select_measure}>
              <TextInput
                style={[textTypographyStyles.MAIN_16_400, inputStyles.input, styles.measure_input]}
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                value={values.quantity}
                placeholder="Enter the quantity"
                keyboardType="numeric"
              />
             <View style={styles.measure_select}>
               <AppDropDown 
                  schema={{
                    label: 'value',
                    value: 'id'
                  }} 
                  value={values.unitOfWeight}
                  name="unitOfWeight"
                  items={data.unitsOfWeight}
                  zIndex={1}
            />
              </View>
            </View>
            {touched.quantity && errors.quantity && 
              <AppText 
                text={errors.quantity}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            <AppText 
              text={'Price'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
              <View style={styles.select_measure}> 
                <TextInput
                  style={[textTypographyStyles.MAIN_16_400, inputStyles.input, styles.measure_input]}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  placeholder="Enter the price"
                  placeholderTextColor={Colors.SECONDARY}
                  keyboardType = 'numeric'
                />
                <View style={styles.measure_select}>
                  <AppDropDown 
                    schema={{
                      label: 'value',
                      value: 'id'
                    }} 
                    value={values.currency}
                    name="currency"
                    items={data.typeOfCurrency}
                    zIndex={3}
                   />
              </View>
            </View>
            {touched.price && errors.price && 
              <AppText 
                text={errors.price}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            <AppText 
              text={'Location'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <View>
              <AppDropDown 
                  schema={{
                    label: 'countryName',
                    value: 'id'
                  }} 
                  name="country"
                  placeholder="Select a country"
                  items={data.countries}
                  zIndex={1}
            />
            </View>
            {touched.country && errors.country && 
              <AppText 
                text={errors.country}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            {values.country &&
            <AppDropDown
                schema={{
                  label: 'regionName',
                  value: 'region_id'
                }} 
                name="region"
                placeholder="Select a region"
                items={data.countries[Number(values.country)-1].regions}
                zIndex={2}
                style={{...setMargin(16, 0, 0, 0)}}
            />
            }
            {!values.country && 
              <AppText style={[styles.form_select, styles.form_disabled, {...setMargin(16, 0, 0, 0)}]}
                text={'Select a region'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
              />
            }
            {touched.region && errors.region && 
              <AppText 
                text={errors.region}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            <AppText 
              text={'Size'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <AppDropDown
                schema={{
                  label: 'value',
                  value: 'id'
                }} 
                name="size"
                placeholder="Select size"
                items={data.size}
                zIndex={2}
            />
            {touched.size && errors.size && 
              <AppText 
                text={errors.size}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            <AppText 
              text={'Packaging'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <AppDropDown
                schema={{
                  label: 'value',
                  value: 'id'
                }} 
                name="packaging"
                placeholder="Select packaging"
                items={data.packaging}
                zIndex={2}
            />
            {touched.packaging && errors.packaging && 
              <AppText 
                text={errors.packaging}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
            />}
            <AppText 
              text={'Product images'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}} />
            <AppText 
              text={'Pictures work much better than the most talented text. The more photos, the better.'}
              color={Colors.SECONDARY}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(0, 0, 16, 0)}} />
            <View style={styles.send_block}>
              <ButtonWithoutIcon 
                style={styles.preview_button}
                onPress={() => setisModalVisible(true)}
                title='Preview' 
                type = 'light'
              />
              <AppText 
                text={'This ad will be placed on the site after review by a moderator and will be valid for the next 30 days.'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(0, 0, 16, 0)}} />
              {values.title && 
               values.category && 
               values.subcategory && 
              //  values.variety && 
               values.quantity &&
               values.price &&
               values.country &&
               values.region &&
               values.size &&
               values.packaging &&
              <ButtonWithoutIcon 
                style={styles.preview_button}
                onPress={handleSubmit}
                // onPress={() => setisSuccessModalVisible(true)}
                title='Place an advertisment' 
                type = 'dark'
              /> 
              }
              {(!values.title || 
               !values.category || 
               !values.subcategory || 
              //  !values.variety || 
               !values.quantity ||
               !values.price ||
               !values.country ||
               !values.region ||
               !values.size ||
               !values.packaging) &&
              <ButtonWithoutIcon 
                style={styles.submit_button_disabled}
                title='Place an advertisment' 
                type = 'dark'
              />
              }
              {/* <Button onPress={() => { handleSubmit; setisSuccessModalVisible(true)}} title="Submit" /> */}
              {/* <Button disabled={!isValid} onPress={handleSubmit} title="Submit"  /> */}
              <Modal
              visible={isModalVisible}
              transparent={false}
              >
                <MainWrapper>
                  <Pressable
                    style={[styles.preview_nav, {...setMargin(16, 0, 16, 16)}]}
                    onPress={() => setisModalVisible(false)} >
                    <ArrowLeftIcon  fill={Colors.SECONDARY} style={{...setMargin(0, 2, 0, 0)}} />
                    <AppText text={'Preview'}
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_20_500}/>
                  </Pressable>
                <LotPreview data={data} values={values} />
                <ButtonWithIcon 
                  title='Go back' 
                  type = 'light'
                  icon={<StickyArrowLeftIcon  fill={Colors.BUTTON_PRIMARY} />}
                  variant={TEXT_VARIANT.MAIN_16_500}
                  style={[styles.preview_button, {...setMargin(16, 16, 16, 16)}, styles.preview_button_small, {...setPadding(8, 0, 8, 0)}]}
                  onPress={() => setisModalVisible(false)}
                />
               </MainWrapper>
              </Modal>
              <Modal
              visible={isSuccessModalVisible}
              transparent={false}
              >
                <MainWrapper style={styles.modal_mainwrapper}>
                  <Image 
                  style={styles.success_image}
                  source={require('../../assets/images/success.png')}
                  />
                  <AppText 
                    text={'Success!'}
                    color={Colors.PRIMARY}
                    variant={TEXT_VARIANT.MAIN_20_500}
                    style={[{...setMargin(0, 0, 8, 0)}, styles.preview_button_text]}
                    />
                  <AppText 
                    text={'Your ad has been published'}
                    color={Colors.PRIMARY}
                    variant={TEXT_VARIANT.MAIN_16_400}
                    style={styles.preview_button_text}
                    />
                <ButtonWithoutIcon 
                style={[styles.preview_button, styles.success_button]}
                onPress={() => {
                  setisSuccessModalVisible(false);
                  navigation.navigate(ROUTES.Home)}}
                title='Okay' 
                type = 'dark'
              /> 
                 {/* <Button onPress={() => {
                          setisSuccessModalVisible(false);
                          navigation.navigate(ROUTES.Home)}}
                          title="OK" /> */}
               </MainWrapper>
              </Modal>
              {/* <ModalWindow
                children={<AppText
                  text={'Your ad has been published'}
                  color={Colors.PRIMARY}
                  variant={TEXT_VARIANT.MAIN_16_400}
                  style={styles.preview_button_text}
                />}
                isOpen={true} 
                onClose={}       
              /> */}
              {/* <View style={styles.submit_button} onPress={handleSubmit}>
                <AppText 
                  text={'Place an advertisment'}
                  color={Colors.TERTIARY}
                  variant={TEXT_VARIANT.MAIN_18_500}
                  style={styles.submit_button_text} />
              </View> */}
            </View>
          </ScrollView>
        )}
      </Formik>
    </MainWrapper>
  );
};
