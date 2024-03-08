import {FC, ReactNode, useState} from 'react';
import { Pressable, Image, Alert, View, StyleProp, ViewStyle, ImageStyle} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

type Props = {
  id?: number;
  getUri: Function;
  children?: ReactNode;
  image_style: StyleProp<ImageStyle>;
  noimage_style: StyleProp<ViewStyle>;
};

export const AppImagePicker: FC<Props> = ({id, getUri, children, image_style, noimage_style}) => {

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
        style={noimage_style}
        onPress={() => chooseFile('photo')}
      >
        {(filePath.assets)?
        <Image
          source={{uri: filePath.assets[0]?.uri}}
          style={image_style}
            />:
        <View>{children}</View>
        }
      </Pressable>
  );
};
