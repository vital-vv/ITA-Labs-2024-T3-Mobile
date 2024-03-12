import { Pressable, ScrollView, View } from 'react-native';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import styles from './accountScreenStyles'
import { TEXT_VARIANT } from '../../types/textVariant';
import { Colors } from '../../constants/colors';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import MyAds from '../../assets/icons/my_ads.svg';
import Notification from '../../assets/icons/notification.svg';
import Currency from '../../assets/icons/currency.svg';
import Language from '../../assets/icons/global.svg';
import Lock from '../../assets/icons/lock.svg';
import Settings from '../../assets/icons/settings.svg';
import LogOut from '../../assets/icons/logout.svg';
import { setMargin } from '../../utils/styling/margin';
import { AccountStackParams } from '../../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../../constants/routes';
import {FC} from 'react';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Account>;

export const AccountScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <ScrollView>
      <Pressable 
        onPress={() => {
        navigation.navigate(ROUTES.PersonalData, {
          headerTitle: 'Personal data',
        });
        }}
        style={[styles.group_container, 
                styles.tab_container, 
                {...setPadding(24, 16, 16, 16)}]}
      >
        <View style={styles.add_container}>
          <View style={[styles.photo, {...setMargin(0, 16, 0, 0)}]}>
            <AppText
              text={'M'}
              variant = {TEXT_VARIANT.MAIN_20_500}
              color = {Colors.WHITE}
            />
            <AppText
              text={'A'}
              variant = {TEXT_VARIANT.MAIN_20_500}
              color = {Colors.WHITE}
            />
          </View>
          <View style={styles.user_info}>
            <AppText
              text={'Alexander May'}
              variant = {TEXT_VARIANT.MAIN_20_500}
              color = {Colors.PRIMARY}
            />
            <AppText
              text={'+44 654 65 1561'}
              variant = {TEXT_VARIANT.MAIN_16_400}
              color = {Colors.PRIMARY}
            />
          </View>
          </View>
        <ArrowRightIcon />
      </Pressable>
      <View style={styles.group_container}>
        <Pressable 
          onPress={() => {
            navigation.navigate(ROUTES.MyAds, {
              headerTitle: 'My advertisements',
            });
            }}
          style={[styles.tab_container, styles.tab]}>
        <View style={styles.add_container}>
          <MyAds style={setMargin(0, 12, 0, 0)}  fill={Colors.SECONDARY} />
          <AppText
            text={'My advertisements'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </View>
          <AppText
            text={'3'}
            variant = {TEXT_VARIANT.MAIN_20_500}
            color = {Colors.BUTTON_PRIMARY}
          />
        </Pressable>
        <Pressable 
          onPress={() => {
            navigation.navigate(ROUTES.Notifications, {
              headerTitle: 'Notifications',
            });
            }}
          style={[styles.tab_container, styles.tab]}>
        <View style={styles.add_container}>
          <Notification style={setMargin(0, 12, 0, 0)}/>
           <AppText
            text={'Notifications'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </View>
           <AppText
            text={'18'}
            variant = {TEXT_VARIANT.MAIN_20_500}
            color = {Colors.BUTTON_PRIMARY}
          />
        </Pressable>
      </View>
      <View style={styles.group_container}>
        <Pressable 
          onPress={() => {
            navigation.navigate(ROUTES.Currency, {
              headerTitle: 'Currency',
            });
            }}
          style={[styles.tab_container, styles.tab]}>
        <View style={styles.add_container}>
          <Currency style={setMargin(0, 12, 0, 0)} fill={Colors.SECONDARY} />
          <AppText
            text={'Currency'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </View>
          <AppText
            text={'USD, $'}
            variant = {TEXT_VARIANT.MAIN_16_400}
            color = {Colors.PRIMARY}
          />
        </Pressable>
        <Pressable style={[styles.tab_container, styles.tab]}>
        <View style={styles.add_container}>
          <Language style={setMargin(0, 12, 0, 0)}/>
          <AppText
            text={'Language'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </View>
          <AppText
            text={'ENG'}
            variant = {TEXT_VARIANT.MAIN_16_400}
            color = {Colors.PRIMARY}
          />
        </Pressable>
        <Pressable style={[styles.add_container, styles.tab]}>
          <Lock style={setMargin(0, 12, 0, 0)}/>
          <AppText
            text={'Change Password'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </Pressable>
        <Pressable style={[styles.add_container, styles.tab]}>
          <Settings style={setMargin(0, 12, 0, 0)}/>
          <AppText
            text={'Settings'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </Pressable>
      </View>
      <View style={styles.group_container}>
      <Pressable style={[styles.add_container, styles.tab]}>
          <LogOut style={setMargin(0, 12, 0, 0)}/>
          <AppText
            text={'Log out'}
            variant = {TEXT_VARIANT.MAIN_18_400}
            color = {Colors.PRIMARY}
          />
        </Pressable>
      </View>
      </ScrollView>
    </MainWrapper>
  );
};
