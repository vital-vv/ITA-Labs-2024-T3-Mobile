import {Dispatch, FC, SetStateAction, useState} from 'react';
import {ModalWindow} from '../../../../components/modal/modal';
import {Dropdown} from 'react-native-element-dropdown';
import ButtonWithIcon from '../../../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {useGetAllSelectionQuery} from '../../../../api/endpoints';
import {setMargin} from '../../../../utils/styling/margin';
import {styles} from './filterOptionsModalStyles';

type LotListQueryParams = {
  page: number;
  limit: number;
  filterArgs: string;
  id: number;
};

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  queryParams: LotListQueryParams;
  setQueryParams: Dispatch<SetStateAction<LotListQueryParams>>;
};

export const FilterOptionsModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  queryParams,
  setQueryParams,
}) => {
  const {data: filtersData} = useGetAllSelectionQuery();
  const [limitValue, setLimitValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrderValue, setSortOrderValue] = useState('');
  const initialPage = 1;
  const filterParams = {
    ...queryParams,
    limit: +limitValue,
    filterArgs: sortBy,
  };

  const packaging = filtersData?.packaging.map(item => {
    return {value: item, label: item};
  });

  const sortOrderFields = [
    {value: 'ASC', label: 'From min to max'},
    {value: 'DESC', label: 'From max to min'},
  ];

  const sortByFields = [
    {label: 'Quantity', value: 'QUANTITY'},
    {label: 'Trading start date', value: 'CREATED_AT'},
    {label: 'Expiration date', value: 'EXPIRATION_DATE'},
  ];

  const itemsQuantity = [
    {value: '10', label: '10 items'},
    {value: '20', label: '20 items'},
    {value: '30', label: '30 items'},
    {value: '40', label: '40 items'},
    {value: '50', label: '50 items'},
  ];

  const onSaveChanges = () => {
    setQueryParams({...filterParams, page: initialPage});
    setIsModalOpen(false);
  };

  return (
    <ModalWindow isOpen={isModalOpen} onClose={setIsModalOpen}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        maxHeight={250}
        data={itemsQuantity}
        labelField={'label'}
        valueField="value"
        placeholder="Items per page :"
        value={limitValue}
        onChange={item => {
          setLimitValue(item.value);
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        maxHeight={250}
        data={sortByFields}
        labelField={'label'}
        valueField="value"
        placeholder="Sort by :"
        value={sortBy}
        onChange={item => {
          setSortBy(item.value);
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        maxHeight={250}
        data={sortOrderFields}
        labelField="label"
        valueField="value"
        placeholder="Sort order :"
        value={sortOrderValue}
        onChange={item => {
          setSortOrderValue(item.value);
        }}
      />

      <ButtonWithIcon
        title="Save changes"
        style={setMargin(16, 0, 0, 0)}
        onPress={onSaveChanges}
      />
    </ModalWindow>
  );
};
