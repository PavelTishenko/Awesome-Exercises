import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';

import {RootStackParamList, Screens} from '@/navigation/RootNavigator';
import {List} from '@/components/List';

const Form = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, Screens.RESULT>>();
  const {params: exercises} = params;
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.backdrop,
      }}>
      <List items={exercises} />
    </View>
  );
};

export default Form;
