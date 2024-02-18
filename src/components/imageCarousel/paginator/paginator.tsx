import {Animated, View, useWindowDimensions} from 'react-native';
import {styles} from './paginatorStyles';
import { Colors } from '../../../constants/colors';


type Props = {
  slides: {id?: number; imageURL: string}[];
  scrollX: Animated.Value;
};

export const Paginator = ({slides, scrollX}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  return (
    <View style={styles.dotsContainer}>
      {slides.map((item, index) => {
        const inputRange = [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ];
        const dotSize = scrollX.interpolate({
          inputRange,
          outputRange: [5, 10, 5],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            Colors.CAROUSEL_PAGINATOR_DEFAULT,
            Colors.CAROUSEL_PAGINATOR_ACTIVE,
            Colors.CAROUSEL_PAGINATOR_DEFAULT,
          ],
          extrapolate: 'clamp',
        });
        const borderRadius = scrollX.interpolate({
          inputRange,
          outputRange: [5, 10, 5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor,
              borderRadius,
              marginHorizontal: 5,
            }}
          />
        );
      })}
    </View>
  );
};
