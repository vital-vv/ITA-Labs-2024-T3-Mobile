import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {DateTime, Duration} from 'luxon';
import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import TimeIcon from '../../assets/icons/time.svg';
import {styles} from './dateCounterStyles';

type Props = {
  date: string;
};
export const DateCounter: FC<Props> = ({date}) => {
  const [day, setDay] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [min, setMin] = useState<number>();
  const [isExpired, setIsExpired] = useState(false);

  const counter = (date: string) => {
    const difference = DateTime.fromISO(date).diffNow();

    const updateStateWithTimeDifference = (timeDifference: Duration) => {
      const {days, hours, minutes} = timeDifference
        .shiftTo('days', 'hours', 'minutes')
        .toObject();

      if (typeof days !== 'undefined') {
        setDay(Math.floor(days));
      }

      if (typeof hours !== 'undefined') {
        setHour(Math.floor(hours));
      }

      if (typeof minutes !== 'undefined') {
        setMin(Math.floor(minutes));
      }
    };

    if (difference.milliseconds >= 0) {
      updateStateWithTimeDifference(difference);
    } else if (difference.milliseconds < 0) {
      setIsExpired(true);
      const positiveDifference = difference.negate();
      updateStateWithTimeDifference(positiveDifference);
    }
  };

  useEffect(() => {
    counter(date);

    const intervalID = setInterval(() => {
      counter(date);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [date]);
  return (
    <View
      style={[
        styles.counterWrapper,
        isExpired ? styles.expired : styles.valid,
      ]}>
      {!isExpired && <TimeIcon fill={Colors.SYSTEM_DARK} />}
      <AppText
        text={`${isExpired ? 'expired ' : ''}${day}d ${hour}h ${min}m`}
        variant={TEXT_VARIANT.MAIN_10_500}
        color={isExpired ? Colors.ERROR_BASE : Colors.SYSTEM_DARK}
      />
    </View>
  );
};
