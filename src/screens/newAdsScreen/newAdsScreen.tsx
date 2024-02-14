import {View, TextInput, ScrollView, Button, Pressable, Modal} from 'react-native';
import {AppText} from '../../components/appText/appText';
import {Colors} from '../../constants/colors';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NewAdsStackParams} from '../../types/navigation.ts';
import {ROUTES} from '../../constants/routes.ts';
import { Field, Formik } from 'formik';
import { TEXT_VARIANT } from '../../types/textVariant.ts';
import {setMargin} from '../../utils/styling/margin.ts';
import styles from './newAdsScreenStyles.ts'
import data from './createLotData.json'
import inputStyles from '../../components/formElements/Input/inputStyles.ts';
import AppDropDown from '../../components/formElements/DropDownInput/AppDropDown.tsx';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import { AppInput } from '../../components/formElements/Input/AppInput.tsx';
import * as yup from 'yup';
import { LotPreview } from '../../components/lotPreview/LotPreview.tsx';
import ButtonWithoutIcon from '../../components/buttons/ButtonWithoutIcon/ButtonWithoutIcon.tsx';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon.tsx';
import StickyArrowLeftIcon from '../../assets/icons/sticky-arrow-left.svg';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';

type Props = NativeStackScreenProps<NewAdsStackParams, ROUTES.NewAds>;

const ReviewSchema = yup.object({
  title: yup.string().required().min(3),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  quantity: yup.string().required()
  .test('is-num-more-than-0', 'Quantity must be more than 0', (val)=> {
    return parseInt(val) > 0
  }),
  unitOfWeight: yup.string().required(),
  price: yup.string().required()
  .test('is-price-more-than-0', 'Price must be more than 0', (val)=> {
    return parseInt(val) > 0
  }),
  currency: yup.string().required(),
  country: yup.string().required(),
  region: yup.string().required(),
});


export const NewAdsScreen: FC<Props> = ({navigation, route}) => {

  const [isModalVisible, setisModalVisible] = useState(false);
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
          unitOfWeight: '',
          price: '',
          currency: '',
          country: '',
          region: '',
          size: '',
          packaging: '',
        }}
        validationSchema={ReviewSchema}
        onSubmit={(values) => {
          console.log(values)
          }
        }
      >
        {({ handleChange, handleBlur, handleSubmit,   setFieldTouched, values, errors, touched}) => (
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
                style={{...setMargin(4, 0, 16, 0)}}
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
            {touched.subcategory && errors.subcategory && 
              <AppText 
                text={errors.subcategory}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}} 
                />}
            {!values.category && 
              <AppText style={[styles.form_select, styles.form_disabled]}
                text={'Select a product type'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
               />
            }
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
                  defaultValue={values.unitOfWeight='1'}
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
                style={{...setMargin(4, 0, 16, 0)}} 
            />}
            <AppText 
              text={'Price'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(0, 0, 8, 0)}} />
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
                  defaultValue={values.currency='1'}
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
                style={{...setMargin(4, 0, 16, 0)}} 
            />}
            <AppText 
              text={'Location'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(0, 0, 8, 0)}} />
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
                style={{...setMargin(4, 0, 16, 0)}} 
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
            />
            }
            {touched.region && errors.region && 
              <AppText 
                text={errors.region}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 16, 0)}} 
            />}
            {!values.country && 
              <AppText style={[styles.form_select, styles.form_disabled, {...setMargin(0, 0, 16, 0)}]}
                text={'Select a region'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
              />
            }
            <AppText 
              text={'Size'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(0, 0, 8, 0)}} />
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
                style={{...setMargin(4, 0, 16, 0)}} 
            />}
            <AppText 
              text={'Packaging'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(0, 0, 8, 0)}} />
            <AppDropDown
                schema={{
                  label: 'value',
                  value: 'id'
                }} 
                name="packaging"
                placeholder="Select packaging."
                items={data.packaging}
                zIndex={2}
            />
            {touched.packaging && errors.packaging && 
              <AppText 
                text={errors.packaging}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 16, 0)}} 
            />}
            <AppText 
              text={'Product images'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(0, 0, 8, 0)}} />
            <AppText 
              text={'Pictures work much better than the most talented text. The more photos, the better.'}
              color={Colors.SECONDARY}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(0, 0, 16, 0)}} />
            <View style={styles.send_block}>
              <Pressable 
                style={styles.preview_button}
                onPress={() => {
                  navigation.navigate(ROUTES.Lot, {
                    id: 1,
                    headerTitle: 'Preview',
                  })}}>
                <AppText 
                  text={'Preview'}
                  color={Colors.BUTTON_PRIMARY}
                  variant={TEXT_VARIANT.MAIN_18_500}
                  style={styles.preview_button_text}
                  />
              </Pressable>
              <AppText 
                text={'This ad will be placed on the site after review by a moderator and will be valid for the next 30 days.'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(0, 0, 16, 0)}} />
              <Button onPress={() => setisModalVisible(true)} title="Submit" />
              {/* <Button onPress={handleSubmit} title="Submit"  /> */}
              <Modal
              visible={isModalVisible}
              transparent={false}
              >
                <View style={[styles.preview_nav, {...setMargin(16, 0, 16, 16)}]}>
                  <ArrowLeftIcon  fill={Colors.SECONDARY} style={{...setMargin(0, 2, 0, 0)}} />
                  <AppText text={'Preview'}
                    color={Colors.PRIMARY}
                    variant={TEXT_VARIANT.MAIN_20_500}/>
                </View>
               <LotPreview values={values} />
               <ButtonWithIcon 
                title='Go back' 
                type = 'light'
                icon={<StickyArrowLeftIcon  fill={Colors.BUTTON_PRIMARY} />}
                variant={TEXT_VARIANT.MAIN_16_500}
                style={[styles.preview_button, {...setMargin(16, 16, 16, 16)}, styles.preview_button_small]}
               />
              </Modal>
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
