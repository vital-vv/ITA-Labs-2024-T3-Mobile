import {Image, Pressable, View} from 'react-native';
import React, {FC, useState} from 'react';
import styles from './myAdsItemStyles';
import {HorizontalDivider} from '../horizontalDivider/horizontalDivider';
import {AppText} from '../appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';
import {DateCounter} from '../DateCounter/dateCounter';
import {Lot} from '../../types/api/lots';
import {DateTime} from 'luxon';
import ButtonWithIcon from '../buttons/ButtonWithIcon/ButtonWithIcon';
import SettingsIcon from '../../assets/icons/settings.svg';
import CheckIcon from '../../assets/icons/checkmark.svg';
import Warning from '../../assets/icons/warning.svg';
import ShutDown from '../../assets/icons/shut_down.svg';
import {ModalWindow} from '../modal/modal';
import {useConfirmLotMutation, useDeactivateLotMutation} from '../../api/endpoints';
import {globalNavigate} from '../../navigation/globalNavigation';
import {ROUTES} from '../../constants/routes';

type Props = {
  lot: Lot;
};

export const MyAdsItem: FC<Props> = ({ lot }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLot] = useConfirmLotMutation();
  const [deactivateLot] = useDeactivateLotMutation();

  return (
    <>
      <HorizontalDivider />
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: lot.image_url[0].url }} />
        <View style={styles.lot_info}>
          <View style={styles.lot_block}>
            <AppText text={lot.title} variant={TEXT_VARIANT.MAIN_18_500} />
            {(lot.status === 'moderated' || lot.status === 'cancelled') &&
              <View style={lot.status === 'moderated' ? styles.on_moderation : styles.rejected}>
                <AppText
                  text={lot.status === 'moderated' ? 'On moderation' : 'Rejected'}
                  variant={TEXT_VARIANT.MAIN_14_400}
                  color={lot.status === 'moderated' ? Colors.SYSTEM_BASE : Colors.ERROR_BASE}
                />
              </View>
            }
          </View>
          <View style={styles.lot_block}>
            {lot.status === 'active' &&
              <DateCounter date={lot.expiration_date} />
            }
            <AppText
              text={lot.lot_id}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
          <AppText
            text={DateTime.fromISO(lot.created_at).toFormat(
              'yyyy.LL.dd, HH:mm ',
            )
            }
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.PRIMARY}
            style={{ ...setMargin(12, 0, 0, 0) }}
          />
          {lot.status === 'cancelled' && lot.reject_message &&
            <View style={[styles.moderator_description, styles.lot_block]}>
              <Warning />
              <AppText
                text={lot.reject_message}
                variant={TEXT_VARIANT.MAIN_14_400}
                color={Colors.ERROR_BASE}
              />
            </View>
          }
          <View style={styles.pricesWrapper}>
            <View style={[styles.bets_block]}>
              {lot.leading?.amount ? (
                <View >
                  <AppText
                    text={`${lot.currency} ${lot.leading.amount}`}
                    variant={TEXT_VARIANT.MAIN_20_500}
                    color={Colors.SUCCEESS}
                    style={{ lineHeight: 24 }}
                  />
                  <AppText
                    text={`${lot.currency} ${(lot.leading.amount / lot.quantity).toFixed(
                      2,
                    )}/${lot.weight}`}
                    variant={TEXT_VARIANT.MAIN_12_400}
                    color={Colors.SECONDARY}
                  />
                </View>
              ) : (
                <AppText
                  text={'No bets'}
                  variant={TEXT_VARIANT.MAIN_16_400}
                  color={Colors.SECONDARY}
                  style={{ ...setMargin(16, 0, 0, 0), lineHeight: 24 }}
                />
              )}
            </View>
            <View style={styles.bets_block}>
              <View >
                <AppText
                  text={`${lot.currency} ${lot.total_price}`}
                  variant={TEXT_VARIANT.MAIN_20_500}
                />
                <AppText
                  text={`${lot.currency} ${lot.price_per_unit.toFixed(2)}/${lot.weight}`}
                  variant={TEXT_VARIANT.MAIN_12_400}
                  color={Colors.SECONDARY}
                />
              </View>
            </View>
          </View>
        </View>
        {lot.status !== 'expired' &&
          <View style={styles.buttons_wrapper}>
            {lot.status === 'active' &&
              <ButtonWithIcon
                title="Confirm deal"
                type="success"
                icon={<CheckIcon fill={Colors.WHITE} />}
                onPress={() => {confirmLot(lot.lot_id), 
                  globalNavigate(ROUTES.AccountStack, {screen: ROUTES.MyAdsStack})}}
              />
            }
            {(lot.status === 'moderated' || lot.status === 'cancelled') &&
              <ButtonWithIcon
                title="Manage"
                type="light"
                icon={<SettingsIcon fill={Colors.BUTTON_PRIMARY} />}
                onPress={() => setIsModalVisible(true)}
              />
            }
          </View>
        }
      </View>
      <ModalWindow
        isOpen={isModalVisible}
        onClose={setIsModalVisible}>
        <Pressable
          onPress={() => {deactivateLot(lot.lot_id), 
          setIsModalVisible(false), 
          globalNavigate(ROUTES.AccountStack, {screen: ROUTES.MyAdsStack});}}>
          <View style={styles.lot_block}>
            <ShutDown />
            <AppText
              text={'Deactivate'}
              color={Colors.ERROR_BASE}
              variant={TEXT_VARIANT.MAIN_18_400}
            />
          </View>
        </Pressable>
      </ModalWindow>
    </>
  );
};
