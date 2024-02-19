import {
  Animated,
  Image,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import {FC, useRef, useState} from 'react';
import {Paginator} from '../paginator/paginator';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import {FlashList} from '@shopify/flash-list';
import {styles} from './carouselStyles';
import {Colors} from '../../../constants/colors';

type Props = {
  data: {id: number; imageURL: string}[];
};

export const Carousel: FC<Props> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<FlashList<{id: number; imageURL: string}>>(null);
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const scrollToNext = () => {
    if (slide === data.length - 1) {
      return;
    }
    slidesRef.current?.scrollToIndex({index: slide + 1});
  };

  const scrollToPrev = () => {
    if (slide === 0) {
      return;
    }
    slidesRef.current?.scrollToIndex({index: slide - 1});
  };

  return (
    <View>
      <FlashList
        ref={slidesRef}
        data={data}
        horizontal={true}
        estimatedItemSize={500}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
        decelerationRate={'fast'}
        bounces={false}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        pagingEnabled={true}
        keyExtractor={item => item.id.toString()}
        scrollEventThrottle={32}
        onViewableItemsChanged={items => {
          if (items.viewableItems[0] && items.viewableItems[0].index !== null) {
            setSlide(items.viewableItems[0].index);
          }
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => (
          <Image source={{uri: item.imageURL}} style={styles.image} />
        )}
      />
      <Paginator slides={data} scrollX={scrollX} />
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttons} onPress={scrollToPrev}>
          <ArrowLeft fill={Colors.WHITE} />
        </Pressable>
        <Pressable style={styles.buttons} onPress={scrollToNext}>
          <ArrowRight fill={Colors.WHITE} />
        </Pressable>
      </View>
    </View>
  );
};
