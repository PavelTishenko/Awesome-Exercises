import React from 'react';
import { SvgXml } from 'react-native-svg';

import { ExerciseType } from '@/api/types.api';
import cardio from '@/assets/svg/cardio';
import gantl from '@/assets/svg/gantl';
import olimpic from '@/assets/svg/olimpic';
import plyo from '@/assets/svg/plyo';
import strenght from '@/assets/svg/strenght';
import stretch from '@/assets/svg/stretch';
import { View } from 'react-native';

type Props = {
  type: ExerciseType;
};

const Icon = ({ type }: Props) => {
  const getIconByType = () => {
    switch (type) {
      case 'cardio':
        return cardio;
      case 'olympic_weightlifting':
        return olimpic;
      case 'plyometrics':
        return plyo;
      case 'powerlifting':
        return gantl;
      case 'strength':
        return strenght;
      case 'stretching':
        return stretch;
      case 'strongman':
        return gantl;
    }
  };
  return (
    <View testID="img">
      <SvgXml
        role="img"
        xml={getIconByType() as string}
        height={90}
        width={90}
        testID="TEST_ID_ICON"
      />
    </View>
  );
};

export default Icon;
