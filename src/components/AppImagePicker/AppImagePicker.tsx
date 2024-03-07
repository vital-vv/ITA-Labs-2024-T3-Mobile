import {FC, useState} from 'react';
import { Pressable, Image, Alert} from 'react-native';
import styles from './appImagePickerStyles';
import * as ImagePicker from 'react-native-image-picker';
import Plus from '../../assets/icons/plus_circle.svg';

type Props = {
  id: number;
  getUri: Function
};

export const AppImagePicker: FC<Props> = ({id, getUri}) => {

  const [filePath, setFilePath] = useState<ImagePicker.ImagePickerResponse>({});

  const chooseFile = (type: any) => {
    let options = {
      mediaType: type,
      selectionLimit: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel ) {
        return ;
      } 
      else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return ;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } 
      setFilePath(response);
      if(response.assets){
        getUri(id, response.assets[0].uri)}
    });
  };
    

  return (
      <Pressable 
        style={styles.image_block}
        onPress={() => chooseFile('photo')}
      >
        {(filePath.assets)?
        <Image
          source={{uri: filePath.assets[0]?.uri}}
          style={styles.imageStyle}
            />:
        <Plus />
        }
      </Pressable>
  );
};
