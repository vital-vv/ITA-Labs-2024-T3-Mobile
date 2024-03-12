import {
  Animated,
  Image,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Paginator} from '../paginator/paginator';
import {FlashList} from '@shopify/flash-list';
import {styles} from './onBoardingCarouselStyles';
import {AppText} from '../../appText/appText';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import {ROUTES} from '../../../constants/routes';
import {useAppNavigation} from '../../../utils/useAppNavigation';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { PersonalDataForm } from '../../forms/PersonalDataForm';

type Props = {
  data: {id: number; imageURL: string; title: string; text: string}[];
};
export const OnBoardingCarousel: FC<Props> = ({data}) => {
  const navigation = useAppNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<
    FlashList<{
      title: any;
      id: number;
      imageURL: string;
      text: string;
    }>
  >(null);
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const skipHandler = () => {
    if (slide === data.length - 1) {
      navigation.navigate(ROUTES.HomeStack, {screen: ROUTES.Home});
      return;
    }
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
          (item.id === data.length) ? (<PersonalDataForm style={styles.form}/>) :
          (<View style={styles.item}>
              <Image source={{uri: item.imageURL}} style={styles.image} />
              <View>
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
          </View>))}
      />
      <View style={styles.navBar}>
        <Paginator slides={data} scrollX={scrollX} />
        <Pressable onPress={skipHandler} style={styles.skipText}>
          <AppText
            variant={TEXT_VARIANT.MAIN_16_500}
            color={Colors.BUTTON_PRIMARY}
            text={`${
              slide === data.length - 1 ? 'Go to Homepage' : 'Skip all'
            }`}
          />
          {slide === data.length - 1 && (
            <ArrowRight fill={Colors.BUTTON_PRIMARY} />
          )}
        </Pressable>
      </View>
    </View>
  );
};
