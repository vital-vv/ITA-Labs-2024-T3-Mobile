import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './mapStyles';
import {FC} from 'react';

export const Map: FC = () => (
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: 53.6913027,
      longitude: 25.3396087,
      latitudeDelta: 5,
      longitudeDelta: 0.5,
    }}
    showsCompass
    showsScale
    showsUserLocation
    scrollEnabled
    showsMyLocationButton
    provider={PROVIDER_GOOGLE}>
    <Marker
      coordinate={{
        latitude: 53.884713,
        longitude: 27.5109689,
      }}
    />
  </MapView>
);
