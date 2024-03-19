import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Paginator} from '../paginator/paginator';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {styles} from './onBoardingCarouselStyles';
import {AppText} from '../../appText/appText';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import {PersonalDataOnboardingForm} from '../../forms/PersonalDataOnboardingForm';

type OnboardingCarouselItem = {
  id: number;
  imageURL: ImageSourcePropType;
  title: string;
  text: string;
};

type Props = {
  data: OnboardingCarouselItem[];
};

export const OnBoardingCarousel: FC<Props> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<FlashList<OnboardingCarouselItem>>(null);
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const onViewableItemsChanged = (items: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (items.viewableItems[0] && items.viewableItems[0].index !== null) {
      setSlide(items.viewableItems[0].index);
    }
  };

  const renderItems: ListRenderItem<OnboardingCarouselItem> = ({item}) =>
    item.id === data.length ? (
      <PersonalDataOnboardingForm style={styles.form} />
    ) : (
      <View style={styles.item}>
        <Image source={item.imageURL} style={styles.image} />
        <View style={styles.textWrapContainer}>
          <AppText
            variant={TEXT_VARIANT.MAIN_20_500}
            text={`${item.title}`}
            style={styles.title}
          />
          <AppText
            variant={TEXT_VARIANT.MAIN_16_400}
            text={`${item.text}`}
            style={styles.text}
          />
        </View>
      </View>
    );

  const skipHandler = () => {
    slidesRef.current?.scrollToIndex({index: data.length - 1});
  };

  return (
    <View style={styles.itemsWrapper}>
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
      <View style={styles.navBar}>
        <Paginator slides={data} scrollX={scrollX} />
        <Pressable onPress={skipHandler} style={styles.skipText}>
          {slide !== data.length - 1 && (
            <>
              <AppText
                variant={TEXT_VARIANT.MAIN_16_500}
                color={Colors.BUTTON_PRIMARY}
                text={`Skip all`}
              />
              <ArrowRight fill={Colors.BUTTON_PRIMARY} />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};
