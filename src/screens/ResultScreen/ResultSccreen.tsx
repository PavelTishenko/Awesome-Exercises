import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList, Screens } from '@/navigation/RootNavigator';
import { List } from '@/components/List';

const useStyles = (theme: MD3Theme) => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.colors.backdrop,
        },
      }),
    [theme],
  );
};

const Form = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, Screens.RESULT>>();
  const { params: exercises } = params;
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <List items={exercises} />
    </View>
  );
};

export default Form;
