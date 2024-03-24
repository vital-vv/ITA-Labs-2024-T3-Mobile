import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {OnBoardingCarousel} from '../../components/onBoarding';
import {FC} from 'react';
import {onBoardingData} from './onboardingCarouselData';

export const OnBoardingScreen: FC = () => {
  return (
    <MainWrapper>
      <OnBoardingCarousel data={onBoardingData} />
    </MainWrapper>
  );
};
