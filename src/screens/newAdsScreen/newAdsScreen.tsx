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
import {Formik, FormikProps, FormikValues} from 'formik';
import {TEXT_VARIANT} from '../../types/textVariant.ts';
import {setMargin} from '../../utils/styling/margin.ts';
import styles from './newAdsScreenStyles.ts';
import inputStyles from '../../components/formElements/Input/inputStyles.ts';
import AppDropDown from '../../components/formElements/DropDownInput/AppDropDown.tsx';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
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
  useGetCitiesQuery,
} from '../../api/endpoints/index.ts';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper.tsx';
import {ImagePickerCarousel} from '../../components/imageCarousel/imagePickerCarousel/ImagePickerCarousel.tsx';
import {
  DropdownArray,
  transformValuesCreateLot,
} from '../../utils/helpers/transformValuesToRequestFunc.ts';
import {ReviewSchema} from './reviewSchema.ts';
import {SubCategory, imageUrl} from '../../types/api/lots.ts';
import {Currency, Packaging, Weight} from '../../types/api/info.tsx';
import {AppImagePickerGetURI} from '../../components/AppImagePicker/AppImagePicker.tsx';
import {showToast} from '../../components/toasts/index.tsx';
import {ToastTypes} from '../../types/toasts.ts';

type Props = NativeStackScreenProps<RootStackParams, ROUTES.NewAds>;

const initialImageUrl: imageUrl[] = [
  {id: 1, imageURL: '', file: {uri: '', type: '', name: ''}},
  {id: 2, imageURL: '', file: {uri: '', type: '', name: ''}},
  {id: 3, imageURL: '', file: {uri: '', type: '', name: ''}},
  {id: 4, imageURL: '', file: {uri: '', type: '', name: ''}},
  {id: 5, imageURL: '', file: {uri: '', type: '', name: ''}},
];

export const NewAdsScreen: FC<Props> = ({navigation, route}) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isSuccessModalVisible, setisSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setisErrorModalVisible] = useState(false);
  const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);
  const formikRef = useRef<FormikProps<Record<string, string>>>(null);
  const [imageUrl, setImageUrl] = useState<imageUrl[]>(initialImageUrl);
  const [subCatValue, setSubCatValue] = useState('');
  const [varietyValue, setVarietyValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [skip, setSkip] = useState(true);
  const [isValidimageUrl, setIsValidImageUrl] = useState(false);
  const [skipCity, setSkipCity] = useState(true);
  const [createLot, {isLoading: isCreateLotLoading}] = useCreateLotMutation();

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

  const {data: allSubCategoriesData} = useGetCategoryQuery(
    Number(subCatValue),
    {skip},
  );

  const {data: CitiesData} = useGetCitiesQuery(countryValue, {skip: skipCity});

  let weightArray: {
    label: Weight;
    value: number;
  }[];
  let currencyArray: {
    label: Currency;
    value: number;
  }[];
  let packagingArray: {
    label: Packaging;
    value: number;
  }[];
  let lengthArray: Array<DropdownArray>;
  let countriesArray: Array<DropdownArray>;
  let citiesArray: Array<DropdownArray>;
  let varietyArray: SubCategory[];

  const mapData = (arr: any) => {
    let newArr = arr.map(function (elem: string, index: number) {
      return {
        label: elem,
        value: index + 1,
      };
    });
    return newArr;
  };

  const getUri: AppImagePickerGetURI = (imageInfo, id) => {
    const {type, uri, fileName} = imageInfo;
    if (id) {
      setImageUrl([
        {id: id, imageURL: uri, file: {uri, type, name: fileName}},
        ...imageUrl.filter(element => element.id !== id),
      ]);
    }
    setIsValidImageUrl(true);
  };

  const onSubmit = async (values: FormikValues, {resetForm}: any) => {
    const newValues = transformValuesCreateLot(
      values,
      weightArray,
      currencyArray,
      lengthArray,
      countriesArray,
      citiesArray,
      packagingArray,
      imageUrl,
    );
    try {
      await createLot(newValues).unwrap();
      setisSuccessModalVisible(true);
      resetForm();
      setImageUrl(initialImageUrl);
      setIsValidImageUrl(false);
      showToast(ToastTypes.Success, 'Lot was successfully created');
    } catch (error) {
      setisErrorModalVisible(true);
      showToast(ToastTypes.Error, 'Something went wrong during lot creation');
    }
  };

  const onSelectCategory = (
    val: FormikValues,
    values: FormikValues,
    setFieldTouched: Function,
  ) => {
    setSubCatValue(val.category_id);
    setSkip(false);
    setVarietyValue('');
    values.subcategory = '';
    values.variety = '';
    setFieldTouched('subcategory', false);
    setFieldTouched('variety', false);
  };

  const onSelectSubcategory = (val: FormikValues, values: FormikValues) => {
    setVarietyValue(val.category_id);
    values.variety = '';
  };

  const onSelectCountry = (
    val: FormikValues,
    values: FormikValues,
    setFieldTouched: Function,
  ) => {
    setCountryValue(val.label);
    setSkipCity(false);
    values.region = '';
    setFieldTouched('region', false);
  };

  const onPressNavigate = (type: string) => {
    switch (type) {
      case 'success':
        setisSuccessModalVisible(false);
        navigation.navigate(ROUTES.HomeStack, {
          screen: ROUTES.Home,
        });
        break;
      case 'discard':
        formikRef.current?.resetForm();
        setIsDiscardModalVisible(false);
        setImageUrl(initialImageUrl);
        setIsValidImageUrl(false);
        navigation.navigate(ROUTES.HomeStack, {
          screen: ROUTES.Home,
        });
        break;
    }
  };

  if (isLoadingSelection && isLoadingCategories) {
    return <SpinnerWrapper />;
  }

  if (allSelectionData) {
    weightArray = mapData(allSelectionData.weight);
    currencyArray = mapData(allSelectionData.currency);
    packagingArray = mapData(allSelectionData.packaging);
    lengthArray = mapData(allSelectionData.lengthUnits);
    countriesArray = mapData(allSelectionData.countries);
  }

  if (allSubCategoriesData && subCatValue) {
    varietyArray = allSubCategoriesData?.subcategories.filter(
      subcategory => subcategory.category_id === Number(varietyValue),
    );
  }

  if (CitiesData) {
    citiesArray = mapData(CitiesData);
  }

  if (isCreateLotLoading)  {
    return <SpinnerWrapper />;
  }

  return (
    allSelectionData &&
    allCategoriesData && (
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
            variety: '',
            quantity: '',
            unitOfWeight: '1',
            price: '',
            currency: '1',
            start_price: '',
            country: '',
            region: '',
            fromSize: '',
            toSize: '',
            length_unit: '1',
            packaging: '',
            expiration_days: '30',
          }}
          validationSchema={ReviewSchema}
          onSubmit={(values, {resetForm}) => {
            onSubmit(values, {resetForm});
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
            isValid,
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
                  color={Colors.ERROR_BASE}
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
                  color={Colors.ERROR_BASE}
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
                onSelectItem={val =>
                  onSelectCategory(val, values, setFieldTouched)
                }
              />
              {touched.category && errors.category && (
                <AppText
                  text={errors.category}
                  color={Colors.ERROR_BASE}
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
                  onSelectItem={val => {
                    onSelectSubcategory(val, values);
                  }}
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
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              {values.subcategory && varietyArray && allSubCategoriesData && (
                // @ts-ignore
                <AppDropDown
                  schema={{
                    label: 'name',
                    value: 'category_id',
                  }}
                  name="variety"
                  placeholder="Select a variety"
                  items={varietyArray[0].subcategories}
                  zIndex={2}
                  style={{...setMargin(16, 0, 0, 0)}}
                />
              )}
              {touched.variety && errors.variety && (
                <AppText
                  text={errors.variety}
                  color={Colors.ERROR_BASE}
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
                  color={Colors.ERROR_BASE}
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
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              <View
                style={[styles.select_measure, {...setMargin(16, 0, 0, 0)}]}>
                <TextInput
                  style={[
                    textTypographyStyles.MAIN_16_400,
                    inputStyles.input,
                    styles.measure_input,
                  ]}
                  onChangeText={handleChange('start_price')}
                  onBlur={handleBlur('start_price')}
                  value={values.start_price}
                  placeholder="Enter start price"
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
              {touched.start_price && errors.start_price && (
                <AppText
                  text={errors.start_price}
                  color={Colors.ERROR_BASE}
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
                  value={values.country}
                  name="country"
                  placeholder="Select a country"
                  items={countriesArray}
                  onSelectItem={(val: FormikValues) => {
                    onSelectCountry(val, values, setFieldTouched);
                  }}
                  zIndex={1}
                />
              </View>
              {touched.country && errors.country && (
                <AppText
                  text={errors.country}
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              {values.country && CitiesData && (
                //  @ts-ignore
                <AppDropDown
                  name="region"
                  placeholder="Select a region"
                  items={citiesArray}
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
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              <AppText
                text={'Size from'}
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
                  onChangeText={handleChange('fromSize')}
                  onBlur={handleBlur('fromSize')}
                  value={values.fromSize}
                  placeholder="Enter a size from 1 to 1000"
                  placeholderTextColor={Colors.SECONDARY}
                  keyboardType="numeric"
                />
                <View style={styles.measure_select}>
                  {/* @ts-ignore */}
                  <AppDropDown
                    value={values.length_unit}
                    name="length_unit"
                    items={lengthArray}
                    zIndex={2}
                    placeholder={lengthArray[0].label}
                    defaultValue={lengthArray[0].label}
                  />
                </View>
              </View>
              {touched.fromSize && errors.fromSize && (
                <AppText
                  text={errors.fromSize}
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              <AppText
                text={'Size to'}
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
                  onChangeText={handleChange('toSize')}
                  onBlur={handleBlur('toSize')}
                  value={values.toSize}
                  placeholder="Enter a size from 1 to 1000"
                  placeholderTextColor={Colors.SECONDARY}
                  keyboardType="numeric"
                />
                <View style={styles.measure_select}>
                  {/* @ts-ignore */}
                  <AppDropDown
                    value={values.length_unit}
                    name="length_unit"
                    items={lengthArray}
                    zIndex={2}
                    placeholder={lengthArray[0].label}
                    defaultValue={lengthArray[0].label}
                  />
                </View>
              </View>
              {touched.toSize && errors.toSize && (
                <AppText
                  text={errors.toSize}
                  color={Colors.ERROR_BASE}
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
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              <AppText
                text={'Trading period'}
                color={Colors.PRIMARY}
                variant={TEXT_VARIANT.MAIN_18_500}
                style={{...setMargin(24, 0, 8, 0)}}
              />
              <TextInput
                style={[textTypographyStyles.MAIN_16_400, inputStyles.input]}
                onChangeText={handleChange('expiration_days')}
                onBlur={handleBlur('expiration_days')}
                value={values.expiration_days}
                placeholder="Enter trading period from 1 to 30"
                placeholderTextColor={Colors.SECONDARY}
                keyboardType="numeric"
              />
              {touched.expiration_days && errors.expiration_days && (
                <AppText
                  text={errors.expiration_days}
                  color={Colors.ERROR_BASE}
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
              <ImagePickerCarousel
                imageUrl={imageUrl}
                getUri={getUri}
                isLot={true}
              />
              {!isValidimageUrl && (
                <AppText
                  text={'Image is a required field'}
                  color={Colors.ERROR_BASE}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(4, 0, 0, 0)}}
                />
              )}
              <View style={styles.send_block}>
                <ButtonWithoutIcon
                  style={styles.preview_button}
                  onPress={() => setisModalVisible(true)}
                  title="Preview"
                  type="light"
                />
                <AppText
                  text={`This ad will be placed on the site after review by a moderator and will be valid for the next ${values.expiration_days} days.`}
                  color={Colors.SECONDARY}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  style={{...setMargin(0, 0, 16, 0)}}
                />
                <ButtonWithoutIcon
                  style={styles.preview_button}
                  onPress={handleSubmit}
                  title="Place an advertisment"
                  type="dark"
                  disabled={!(isValid && isValidimageUrl)}
                />

                <Modal visible={isModalVisible} transparent={false}>
                  <MainWrapper>
                    <Pressable
                      style={[
                        styles.preview_nav,
                        {...setMargin(16, 0, 16, 16)},
                      ]}
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
                      countriesArray={countriesArray}
                      citiesArray={citiesArray}
                      varietyArray={varietyArray}
                      packagingArray={packagingArray}
                      lengthArray={lengthArray}
                      values={values}
                      images={imageUrl}
                    />
                    <ButtonWithIcon
                      title="Go back"
                      type="light"
                      icon={
                        <StickyArrowLeftIcon fill={Colors.BUTTON_PRIMARY} />
                      }
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
                        onPressNavigate('success');
                      }}
                      title="Okay"
                      type="dark"
                    />
                  </MainWrapper>
                </Modal>
                <Modal visible={isErrorModalVisible} transparent={false}>
                  <MainWrapper style={styles.modal_mainwrapper}>
                    <Image
                      style={styles.error_image}
                      source={require('../../assets/images/error.png')}
                    />
                    <AppText
                      text={'Error!'}
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_20_500}
                      style={[
                        {...setMargin(24, 0, 8, 0)},
                        styles.preview_button_text,
                      ]}
                    />
                    <AppText
                      text={
                        'Oops, something went wrong. Try submitting the form again.'
                      }
                      color={Colors.PRIMARY}
                      variant={TEXT_VARIANT.MAIN_16_400}
                      style={[
                        styles.preview_button_text,
                        {...setMargin(16, 16, 0, 16)},
                      ]}
                    />
                    <ButtonWithoutIcon
                      style={[styles.preview_button, styles.success_button]}
                      onPress={() => {
                        setisErrorModalVisible(false);
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
                          onPressNavigate('discard');
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
                      <Pressable
                        onPress={() => setIsDiscardModalVisible(false)}>
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
    )
  );
};
