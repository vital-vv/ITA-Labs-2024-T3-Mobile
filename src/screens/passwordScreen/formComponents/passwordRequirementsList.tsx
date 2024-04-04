import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppText} from '../../../components/appText/appText';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {specialSymbols} from '../../../constants/specialSymbols';
import {FC} from 'react';
import {View, ViewStyle} from 'react-native';

type Props = {
  style?: ViewStyle;
};

export const PasswordRequirementsList: FC<Props> = ({style}) => (
  <View style={style}>
    <AppText
      color={Colors.SECONDARY}
      variant={TEXT_VARIANT.MAIN_12_400}
      text={`${specialSymbols.listDot} Must be at least 8 characters`}
    />
    <AppText
      color={Colors.SECONDARY}
      variant={TEXT_VARIANT.MAIN_12_400}
      text={`${specialSymbols.listDot} Should have at least 1 uppercase letter`}
    />
    <AppText
      color={Colors.SECONDARY}
      variant={TEXT_VARIANT.MAIN_12_400}
      text={`${specialSymbols.listDot} Should have at least 1 lowercase letter`}
    />
    <AppText
      color={Colors.SECONDARY}
      variant={TEXT_VARIANT.MAIN_12_400}
      text={`${specialSymbols.listDot} Should have at least 1 number`}
    />
    <AppText
      color={Colors.SECONDARY}
      variant={TEXT_VARIANT.MAIN_12_400}
      text={`${specialSymbols.listDot} Should have at least 1 special symbol`}
    />
  </View>
);
