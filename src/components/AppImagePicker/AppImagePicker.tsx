import {FC, ReactNode, useState} from 'react';
import {
  Pressable,
  Image,
  Alert,
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ModalWindow} from '../modal/modal';
import styles from './appImagePickerStyles';
import MyAds from '../../assets/icons/my_ads.svg';
import Bin from '../../assets/icons/bin.svg';
import {setMargin} from '../../utils/styling/margin';
import {AppText} from '../appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';

type Props = {
  id?: number;
  getUri: Function;
  children?: ReactNode;
  image_style: StyleProp<ImageStyle>;
  noimage_style: StyleProp<ViewStyle>;
  imageUrl?: string;
  isLot?: boolean;
};

export const AppImagePicker: FC<Props> = ({
  id,
  getUri,
  children,
  image_style,
  noimage_style,
  imageUrl,
  isLot,
}) => {
  const [filePath, setFilePath] = useState<ImagePicker.ImagePickerResponse>({});
  const [isOpen, setIsOpen] = useState(false);
  const showDelete = !isLot && true;

  const chooseFile = (type: 'photo') => {
    let options = {
      mediaType: type,
      selectionLimit: 1,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      }
      setFilePath(response);
      if (response.assets) {
        getUri(
          id,
          response.assets[0].uri,
          response.assets[0].type,
          response.assets[0].fileName,
        );
      }
    });
  };

  const onChoosePhoto = () => {
    chooseFile('photo'), setIsOpen(false);
  };

  const onDeletePhoto = () => {
    getUri(0, ''), setIsOpen(false);
  };

  return (
    <Pressable style={noimage_style} onPress={() => setIsOpen(true)}>
      {imageUrl && filePath.assets ? (
        <Image source={{uri: filePath.assets[0]?.uri}} style={image_style} />
      ) : (
        <View>{children}</View>
      )}
      <ModalWindow isOpen={isOpen} onClose={setIsOpen}>
        <Pressable style={styles.modal_container} onPress={onChoosePhoto}>
          <MyAds style={setMargin(0, 12, 0, 0)} />
          <AppText
            text={'Choose a new image'}
            variant={TEXT_VARIANT.MAIN_18_400}
            color={Colors.PRIMARY}
          />
        </Pressable>
        {showDelete && imageUrl ? (
          <Pressable style={styles.modal_container} onPress={onDeletePhoto}>
            <Bin style={setMargin(0, 12, 0, 0)} fill={Colors.ERROR_DARK} />
            <AppText
              text={'Delete profile image'}
              variant={TEXT_VARIANT.MAIN_18_400}
              color={Colors.ERROR_DARK}
            />
          </Pressable>
        ) : (
          showDelete && (
            <Pressable style={styles.modal_container} disabled={true}>
              <Bin style={setMargin(0, 12, 0, 0)} fill={Colors.TERTIARY} />
              <AppText
                text={'Delete profile image'}
                variant={TEXT_VARIANT.MAIN_18_400}
                color={Colors.TERTIARY}
              />
            </Pressable>
          )
        )}
      </ModalWindow>
    </Pressable>
  );
};
