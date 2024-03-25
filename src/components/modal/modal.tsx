import {Dispatch, ReactNode, SetStateAction} from 'react';
import {View, Modal, ScrollView, Pressable} from 'react-native';
import {styles} from './modalStyles';
import CloseIcon from '../../assets/icons/close.svg';
type Props = {
  children?: ReactNode;
  isOpen: boolean;
  withInput?: boolean;
  onClose: Dispatch<SetStateAction<boolean>> | (() => void);
};
export const ModalWindow = ({children, isOpen, onClose}: Props) => {
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent={true}
      statusBarTranslucent={false}>
      <View style={styles.modalWrapper}>
        <View style={styles.content}>
          <Pressable
            style={styles.closeBtn}
            onPress={() => {
              onClose(false);
            }}>
            <CloseIcon />
          </Pressable>
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};
