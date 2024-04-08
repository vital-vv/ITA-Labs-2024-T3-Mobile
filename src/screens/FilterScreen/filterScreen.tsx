import {FC, useState} from 'react';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {styles} from './filterScreenStyles';
import {useGetAllSelectionQuery} from '../../api/endpoints';
import {Dropdown} from 'react-native-element-dropdown';
import {
  itemsPerPage,
  mainSortField,
  sortOrder,
} from './constants/inititalOptions';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';
import {filterActions} from '../../store/slices/filterOptionsSlice';
import {ROUTES} from '../../constants/routes';
import {HomeStackParams} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppMultiSelect} from '../../components/multiSelect/multiSelect';
import {AppText} from '../../components/appText/appText';
import inputStyles from '../../components/formElements/Input/inputStyles';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import {setMargin} from '../../utils/styling/margin';

type Props = NativeStackScreenProps<HomeStackParams, ROUTES.LotsFilter>;

export const FilterScreen: FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selector.filterOptionsSlice);
  const {data: filtersInfoDB} = useGetAllSelectionQuery();
  const [mainSortFieldValue, setMainSortFieldValue] = useState(
    filterState.mainSortField,
  );
  const [sortOrderValue, setSortOrderValue] = useState(filterState.sortOrder);
  const [fromPrice, setFromPrice] = useState(filterState.fromPrice);
  const [toPrice, setToPrice] = useState(filterState.toPrice);
  const [keyWord, setKeyWord] = useState(filterState.keyWord);

  const [itemsPerPageValue, setItemsPerPageValue] = useState(
    `${filterState.itemsPerPage}`,
  );
  const [selectedPackaging, setSelectedPackaging] = useState(
    filterState.packaging,
  );
  const packagingFields = filtersInfoDB?.packaging.map(item => {
    return {value: `${item.toUpperCase()}`, label: `${item}`};
  });

  const onPressApplyChanges = () => {
    dispatch(
      filterActions.setFilterOptions({
        ...filterState,
        page: 1,
        itemsPerPage: +itemsPerPageValue,
        packaging: selectedPackaging,
        mainSortField: mainSortFieldValue,
        sortOrder: sortOrderValue,
        fromPrice: fromPrice,
        toPrice: toPrice,
        keyWord: keyWord,
      }),
    );
    navigation.goBack();
  };

  const onResetFilterOptions = () => {
    dispatch(filterActions.resetFilterOptions());
    navigation.goBack();
  };

  return (
    <MainWrapper style={styles.mainWrapper}>
      <AppText
        text="Items per page : "
        variant={TEXT_VARIANT.MAIN_14_400}
        style={styles.text}
        color={Colors.SECONDARY}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        activeColor={Colors.SYSTEM_EXTRALIGHT}
        itemTextStyle={styles.itemTextStyle}
        maxHeight={250}
        data={itemsPerPage}
        labelField={'label'}
        valueField="value"
        placeholder="Items per page :"
        value={itemsPerPageValue}
        onChange={item => {
          setItemsPerPageValue(item.value);
        }}
      />
      {packagingFields && (
        <AppMultiSelect
          placeholder="Selected packaging :"
          data={packagingFields}
          selected={selectedPackaging}
          setSelected={setSelectedPackaging}
        />
      )}
      <AppText
        text="Main sort field : "
        variant={TEXT_VARIANT.MAIN_14_400}
        style={styles.text}
        color={Colors.SECONDARY}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        activeColor={Colors.SYSTEM_EXTRALIGHT}
        itemTextStyle={styles.itemTextStyle}
        maxHeight={250}
        data={mainSortField}
        labelField={'label'}
        valueField="value"
        placeholder="Main sort field:"
        value={mainSortFieldValue}
        onChange={item => {
          setMainSortFieldValue(item.value);
        }}
      />

      <AppText
        text="Main sort field order : "
        variant={TEXT_VARIANT.MAIN_14_400}
        color={Colors.SECONDARY}
        style={styles.text}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        activeColor={Colors.SYSTEM_EXTRALIGHT}
        itemTextStyle={styles.itemTextStyle}
        maxHeight={250}
        data={sortOrder}
        labelField={'label'}
        valueField="value"
        placeholder="Main sort field order :"
        value={sortOrderValue}
        onChange={item => {
          setSortOrderValue(item.value);
        }}
      />
      <View style={styles.buttonsWrapper}>
        <View>
          <AppText
            text="From price : "
            variant={TEXT_VARIANT.MAIN_14_400}
            style={styles.text}
            color={Colors.SECONDARY}
          />
          <TextInput
            keyboardType="numeric"
            value={fromPrice}
            style={[inputStyles.input, styles.input]}
            onChangeText={setFromPrice}
          />
        </View>
        <View>
          <AppText
            text="To Price: "
            variant={TEXT_VARIANT.MAIN_14_400}
            style={styles.text}
            color={Colors.SECONDARY}
          />
          <TextInput
            value={toPrice}
            onChangeText={setToPrice}
            keyboardType="numeric"
            style={[inputStyles.input, styles.input]}
          />
        </View>
      </View>
      <View>
        <AppText
          text="Keyword: "
          variant={TEXT_VARIANT.MAIN_14_400}
          style={[styles.text, setMargin(10, 0, 0, 0)]}
          color={Colors.SECONDARY}
        />
        <TextInput
          value={keyWord}
          onChangeText={setKeyWord}
          style={[inputStyles.input]}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <ButtonWithIcon
          title="Apply"
          style={styles.button}
          onPress={onPressApplyChanges}
        />
        <ButtonWithIcon
          title="Reset"
          style={styles.button}
          onPress={onResetFilterOptions}
        />
      </View>
    </MainWrapper>
  );
};
