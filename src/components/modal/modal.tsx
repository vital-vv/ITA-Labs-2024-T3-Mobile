import {Children, Dispatch, ReactNode, SetStateAction, useState} from 'react';
import {View, Modal, ScrollView, Pressable, Text} from 'react-native';
import {styles} from './modalStyles';
import React from 'react';
// import CloseIcon from '../../assets/icons/close.svg';
type Props = {
  children?: ReactNode;
  isOpen: boolean;
  withInput?: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
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
            {/* <CloseIcon /> */}
          </Pressable>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};
