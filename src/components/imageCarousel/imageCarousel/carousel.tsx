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
import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {styles} from './carouselStyles';
import {Colors} from '../../../constants/colors';
import {LotImage} from '../../../types/api/info';
import ImageNotFound from '../../../assets/icons/imageNotFound.svg';
type Props = {
  data?: LotImage[];
};

export const Carousel: FC<Props> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<FlashList<LotImage>>(null);
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const imageQuantity = data ? data.length : 0;

  const renderItems: ListRenderItem<LotImage> = ({item}) => (
    <Image source={{uri: item.url}} style={styles.image} />
  );

  const onViewableItemsChanged = (items: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (items.viewableItems[0] && items.viewableItems[0].index !== null) {
      setSlide(items.viewableItems[0].index);
    }
  };

  const scrollTo = (arg: 'next' | 'prev') => {
    arg === 'next'
      ? slidesRef.current?.scrollToIndex({index: slide + 1})
      : slidesRef.current?.scrollToIndex({index: slide - 1});
  };

  return data ? (
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
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={renderItems}
      />
      {imageQuantity > 1 && (
        <>
          <Paginator slides={data} scrollX={scrollX} />
          <View style={styles.buttonsContainer}>
            <Pressable
              disabled={slide === 0}
              style={styles.buttons}
              onPress={() => scrollTo('prev')}>
              <ArrowLeft fill={Colors.WHITE} />
            </Pressable>
            <Pressable
              disabled={slide === data.length - 1}
              style={styles.buttons}
              onPress={() => scrollTo('next')}>
              <ArrowRight fill={Colors.WHITE} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  ) : (
    <View style={styles.imageNotFound}>
      <ImageNotFound fill={Colors.TERTIARY} width={50} height={50} />
    </View>
  );
};
