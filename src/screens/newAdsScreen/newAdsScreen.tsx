import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import {AppText} from '../../components/appText/appText';
import {Colors} from '../../constants/colors';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {FC, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../types/navigation.ts';
import {ROUTES} from '../../constants/routes.ts';
import {Formik, FormikProps} from 'formik';
import {TEXT_VARIANT} from '../../types/textVariant.ts';
import {setMargin} from '../../utils/styling/margin.ts';
import styles from './newAdsScreenStyles.ts';
import data from './createLotData.json';
import inputStyles from '../../components/formElements/Input/inputStyles.ts';
import AppDropDown from '../../components/formElements/DropDownInput/AppDropDown.tsx';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import * as yup from 'yup';
import {LotPreview} from '../../components/lotPreview/LotPreview.tsx';
import ButtonWithoutIcon from '../../components/buttons/ButtonWithoutIcon/ButtonWithoutIcon.tsx';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon.tsx';
import StickyArrowLeftIcon from '../../assets/icons/sticky-arrow-left.svg';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import {ModalWindow} from '../../components/modal/modal.tsx';
import {
  useCreateLotMutation,
  useGetAllCategoriesQuery,
  useGetAllSelectionQuery,
  useGetCategoryQuery,
} from '../../api/endpoints/index.ts';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper.tsx';
import React from 'react';
import { ImagePickerCarousel } from '../../components/imageCarousel/imagePickerCarousel/ImagePickerCarousel.tsx';
import {LotCreate} from '../../types/api/api';

type Props = NativeStackScreenProps<RootStackParams, ROUTES.NewAds>;

const ReviewSchema = yup.object({
  title: yup.string().required().min(3).max(40),
  description: yup.string().min(3).max(300),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .required()
    .moreThan(0, 'Quantity must be more than 0'),
  unitOfWeight: yup.number().required(),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required()
    .moreThan(0, 'Price must be more than 0'),
  currency: yup
    .number()
    .typeError('Currency must be a number')
    .required()
    .moreThan(0, 'Currency must be more than 0'),
  country: yup.string().required(),
  region: yup.string().required(),
  size: yup.string().required(),
  packaging: yup.string().required(),
});

export const NewAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isSuccessModalVisible, setisSuccessModalVisible] = useState(false);
  const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);
  const formikRef = useRef<FormikProps<Record<string, string>>>(null);
  const [imageUrl, setImageUrl] = useState([
    {id: 1, imageURL: ''}, 
    {id: 2, imageURL: ''},
    {id: 3, imageURL: ''}, 
    {id: 4, imageURL: ''},
    {id: 5, imageURL: ''},
  ])
  const [subCatValue, setSubCatValue] = useState(1);
  const [skip, setSkip] = useState(true)
  const [createLot, {isError, error, isSuccess }] = useCreateLotMutation()

  const getUri = (id: number, val: string) => {
    setImageUrl( [ {id: id, imageURL: val}, ...imageUrl.filter(element => element.id !== id),
    ])
  }

  const {
    data: allSelectionData,
    isLoading: isLoadingSelection,
    refetch: refetchallSelectionData,
  } = useGetAllSelectionQuery();

  const {
    data: allCategoriesData,
    isLoading: isLoadingCategories,
    refetch: refetchallCategoriesData,
  } = useGetAllCategoriesQuery();

  const {
    data: allSubCategoriesData,
  } = useGetCategoryQuery(subCatValue, {skip});

  let weightArray: Array<any>;
  let currencyArray: Array<any>;
  let packagingArray: Array<any>;
  let sizeArray: Array<any>;

  const mapAllSelectionData: (
    allSelectionData: any,
  ) => void = allSelectionData => {
    const mapData = (arr: []): Array<any> => {
      let newArr = arr.map(function (elem: string, index: number) {
        return {
          label: elem,
          value: index+1,
        };
      });
      return newArr;
    };

    weightArray = mapData(allSelectionData.weight);
    currencyArray = mapData(allSelectionData.currency);
    packagingArray = mapData(allSelectionData.packaging);
    sizeArray = mapData(allSelectionData.size);
  };

  if (isLoadingSelection && isLoadingCategories) {return <SpinnerWrapper />;}

  if (allSelectionData) {
    mapAllSelectionData(allSelectionData);
  }

  const transformValuesToRequest: (values: any) => void = values => {
    console.log(weightArray)
      const requestValues: LotCreate = {
        category_id: Number(values.category),
        price_per_unit: Number((Number(values.price) / Number(values.quantity)).toFixed(2)),
        title: values.title,
        quantity: Number(values.quantity),
        weight: (weightArray[Number(values.unitOfWeight)-1]['label']).toUpperCase(),
        location: {
          id: 0,
          country: data.countries[Number(values.country) - 1].countryName,
          region: data.countries[Number(values.country) - 1].regions[
            Number(values.region) - 1
          ].regionName
        },
        description: values.description,
        status: 'MODERATED',
        variety: values.variety || '',
        size: Number(values.size),
        packaging: (packagingArray[Number(values.packaging)-1]['label']).toUpperCase(),
      };

      return requestValues;
    }

  return (
    allSelectionData && allCategoriesData && (
    <MainWrapper>
      <Pressable
        style={[styles.preview_nav, {...setMargin(16, 0, 16, 16)}]}
        onPress={() => setIsDiscardModalVisible(true)}>
        <ArrowLeftIcon
          fill={Colors.SECONDARY}
          style={{...setMargin(0, 2, 0, 0)}}
        />
        <AppText
          text={'New advertisement'}
          color={Colors.PRIMARY}
          variant={TEXT_VARIANT.MAIN_18_500}
        />
      </Pressable>
      <Formik
        initialValues={{
          title: '',
          description: '',
          category: '',
          subcategory: '',
          // variety: '',
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
        onSubmit={(values, {resetForm}) => {
          console.log(values);
          let newValues = transformValuesToRequest(values);
          createLot(newValues);        
          if (isError) {
            console.log(error)
          }
          if (isSuccess) {
            console.log("post success!")
          };
          resetForm();
          setisSuccessModalVisible(true);
        }}
        innerRef={formikRef}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldTouched,
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <AppText
              text={'Title'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <TextInput
              style={[textTypographyStyles.MAIN_16_400, inputStyles.input]}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="For example: My apples"
              keyboardType="default"
            />
            {touched.title && errors.title && (
              <AppText
                text={errors.title}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Description'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <TextInput
              style={[textTypographyStyles.MAIN_16_400, inputStyles.input]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="For example: Apples from my farm..."
              keyboardType="default"
            />
            {touched.description && errors.description && (
              <AppText
                text={errors.description}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Category'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 0, 0)}}
            />
            <AppText
              text={
                'Select the category in which you want to submit your product. Your ad must match the theme.'
              }
              color={Colors.SECONDARY}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(8, 0, 16, 0)}}
            />
            {/* @ts-ignore */}
            <AppDropDown
              schema={{
                label: 'name',
                value: 'category_id',
              }}
              name="category"
              placeholder="Select a category"
              items={allCategoriesData}
              zIndex={2}
              multiple={false}
              onSelectItem={(val:any) => {setSubCatValue(val.category_id); setSkip(false)}}
            />
            {touched.category && errors.category && (
              <AppText
                text={errors.category}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            {values.category && allSubCategoriesData && (
              // @ts-ignore
              <AppDropDown
                schema={{
                  label: 'name',
                  value: 'category_id',
                }} 
                name="subcategory"
                placeholder="Select a product type"
                items={allSubCategoriesData?.subcategories}
                zIndex={2}
                style={{...setMargin(16, 0, 0, 0)}}
              />
            )}
            {!values.category && (
              <AppText
                style={[
                  styles.form_select,
                  styles.form_disabled,
                  {...setMargin(16, 0, 0, 0)},
                ]}
                text={'Select a product type'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
              />
            )}
            {touched.subcategory && errors.subcategory && (
              <AppText
                text={errors.subcategory}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Quantity'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <View style={styles.select_measure}>
              <TextInput
                style={[
                  textTypographyStyles.MAIN_16_400,
                  inputStyles.input,
                  styles.measure_input,
                ]}
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                value={values.quantity}
                placeholder="Enter the quantity"
                keyboardType="numeric"
              />
              <View style={styles.measure_select}>
                {/* @ts-ignore */}
                <AppDropDown
                  value={values.unitOfWeight}
                  name="unitOfWeight"
                  items={weightArray}
                  zIndex={1}
                  placeholder="ton"
                />
              </View>
            </View>
            {touched.quantity && errors.quantity && (
              <AppText
                text={errors.quantity}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Price'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <View style={styles.select_measure}>
              <TextInput
                style={[
                  textTypographyStyles.MAIN_16_400,
                  inputStyles.input,
                  styles.measure_input,
                ]}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                placeholder="Enter the price"
                placeholderTextColor={Colors.SECONDARY}
                keyboardType="numeric"
              />
              <View style={styles.measure_select}>
                {/* @ts-ignore */}
                <AppDropDown
                  value={values.currency}
                  name="currency"
                  items={currencyArray}
                  zIndex={3}
                  placeholder={currencyArray[0].label}
                  defaultValue="USD"
                />
              </View>
            </View>
            {touched.price && errors.price && (
              <AppText
                text={errors.price}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Location'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <View>
              {/* @ts-ignore */}
              <AppDropDown
                schema={{
                  label: 'countryName',
                  value: 'id',
                }}
                name="country"
                placeholder="Select a country"
                items={data.countries}
                zIndex={1}
              />
            </View>
            {touched.country && errors.country && (
              <AppText
                text={errors.country}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            {values.country && (
              //  @ts-ignore
              <AppDropDown
                schema={{
                  label: 'regionName',
                  value: 'region_id',
                }}
                name="region"
                placeholder="Select a region"
                items={data.countries[Number(values.country) - 1].regions}
                zIndex={2}
                style={{...setMargin(16, 0, 0, 0)}}
              />
            )}
            {!values.country && (
              <AppText
                style={[
                  styles.form_select,
                  styles.form_disabled,
                  {...setMargin(16, 0, 0, 0)},
                ]}
                text={'Select a region'}
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_16_400}
              />
            )}
            {touched.region && errors.region && (
              <AppText
                text={errors.region}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Size'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            {/* @ts-ignore */}
            <AppDropDown
              name="size"
              placeholder="Select size"
              items={sizeArray}
              zIndex={2}
            />
            {touched.size && errors.size && (
              <AppText
                text={errors.size}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Packaging'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            {/* @ts-ignore */}
            <AppDropDown
              name="packaging"
              placeholder="Select packaging"
              items={packagingArray}
              zIndex={2}
            />
            {touched.packaging && errors.packaging && (
              <AppText
                text={errors.packaging}
                color={Colors.ERROR}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(4, 0, 0, 0)}}
              />
            )}
            <AppText
              text={'Product images'}
              color={Colors.PRIMARY}
              variant={TEXT_VARIANT.MAIN_18_500}
              style={{...setMargin(24, 0, 8, 0)}}
            />
            <AppText
              text={
                'Pictures work much better than the most talented text. The more photos, the better.'
              }
              color={Colors.SECONDARY}
              variant={TEXT_VARIANT.MAIN_12_400}
              style={{...setMargin(0, 0, 16, 0)}}
            />
            <ImagePickerCarousel imageUrl={imageUrl} getUri={getUri}/>
            <View style={styles.send_block}>
              <ButtonWithoutIcon
                style={styles.preview_button}
                onPress={() => setisModalVisible(true)}
                title="Preview"
                type="light"
              />
              <AppText
                text={
                  'This ad will be placed on the site after review by a moderator and will be valid for the next 30 days.'
                }
                color={Colors.SECONDARY}
                variant={TEXT_VARIANT.MAIN_12_400}
                style={{...setMargin(0, 0, 16, 0)}}
              />
              {values.title &&
              values.category &&
              values.subcategory &&
              //  values.variety &&
              values.quantity &&
              values.price &&
              values.country &&
              values.region &&
              values.size &&
              values.packaging ? (
                <ButtonWithoutIcon
                  style={styles.preview_button}
                  onPress={handleSubmit}
                  title="Place an advertisment"
                  type="dark"
                />
              ) : (
                <ButtonWithoutIcon
                  style={styles.submit_button_disabled}
                  title="Place an advertisment"
                  type="dark"
                />
              )}
              <Modal visible={isModalVisible} transparent={false}>
                <MainWrapper>
                  <Pressable
                    style={[styles.preview_nav, {...setMargin(16, 0, 16, 16)}]}
                    onPress={() => {
                      setisModalVisible(false);
                    }}>
                    <ArrowLeftIcon
                      fill={Colors.SECONDARY}
                      style={{...setMargin(0, 2, 0, 0)}}
                    />
                    <AppText
                      text={'Preview'}
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_20_500}
                    />
                  </Pressable>
                  <LotPreview
                    weightArray={weightArray}
                    currencyArray={currencyArray}
                    packagingArray={packagingArray}
                    sizeArray={sizeArray}
                    data={data}
                    values={values}
                  />
                  <ButtonWithIcon
                    title="Go back"
                    type="light"
                    icon={<StickyArrowLeftIcon fill={Colors.BUTTON_PRIMARY} />}
                    variant={TEXT_VARIANT.MAIN_16_500}
                    style={[
                      styles.preview_button,
                      {...setMargin(16, 16, 16, 16)},
                      styles.preview_button_small,
                      {...setPadding(8, 0, 8, 0)},
                    ]}
                    onPress={() => setisModalVisible(false)}
                  />
                </MainWrapper>
              </Modal>
              <Modal visible={isSuccessModalVisible} transparent={false}>
                <MainWrapper style={styles.modal_mainwrapper}>
                  <Image
                    style={styles.success_image}
                    source={require('../../assets/images/success.png')}
                  />
                  <AppText
                    text={'Success!'}
                    color={Colors.PRIMARY}
                    variant={TEXT_VARIANT.MAIN_20_500}
                    style={[
                      {...setMargin(0, 0, 8, 0)},
                      styles.preview_button_text,
                    ]}
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
                      navigation.navigate(ROUTES.HomeStack, {
                        screen: ROUTES.Home,
                      });
                    }}
                    title="Okay"
                    type="dark"
                  />
                </MainWrapper>
              </Modal>
              <ModalWindow
                children={
                  <View style={{...setMargin(8, 8, 8, 8)}}>
                    <AppText
                      text={'Discard edits?'}
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_20_500}
                      style={{...setMargin(0, 0, 16, 0)}}
                    />
                    <AppText
                      text={
                        'If you go back now, you’ll lose all of your edits you’ve made.'
                      }
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_16_400}
                      style={{...setMargin(0, 0, 16, 0)}}
                    />
                    <Pressable
                      onPress={() => {
                        formikRef.current?.resetForm();
                        setIsDiscardModalVisible(false);
                        navigation.navigate(ROUTES.HomeStack, {
                          screen: ROUTES.Home,
                        });
                      }}>
                      <AppText
                        text={'Discard'}
                        color={Colors.ERROR_BASE}
                        variant={TEXT_VARIANT.MAIN_16_400}
                        style={[
                          {...setPadding(8, 0, 8, 0)},
                          {...setMargin(0, 0, 16, 0)},
                          styles.preview_button_text,
                        ]}
                      />
                    </Pressable>
                    <Pressable onPress={() => setIsDiscardModalVisible(false)}>
                      <AppText
                        text={'Cancel'}
                        color={Colors.BUTTON_PRIMARY}
                        variant={TEXT_VARIANT.MAIN_16_400}
                        style={[
                          {...setPadding(8, 0, 8, 0)},
                          styles.preview_button_text,
                        ]}
                      />
                    </Pressable>
                  </View>
                }
                isOpen={isDiscardModalVisible}
                onClose={setIsDiscardModalVisible}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </MainWrapper>
  ))
};
