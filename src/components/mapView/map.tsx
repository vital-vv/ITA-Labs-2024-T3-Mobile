import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './mapStyles';
import {FC} from 'react';

export const Map: FC = () =>   <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
;
