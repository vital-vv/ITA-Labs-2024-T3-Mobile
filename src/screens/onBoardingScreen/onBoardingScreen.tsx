import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {OnBoardingCarousel} from '../../components/onBoarding';
import {onBoardingData} from '../../../mock-images.ts';
import {FC} from 'react';

export const OnBoardingScreen: FC = () => {
  return (
    <MainWrapper>
      <OnBoardingCarousel data={onBoardingData} />
    </MainWrapper>
  );
};
