import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Form, ResultScreen} from '@/screens';
import {Exercise} from '@/api/types.api';
import {useTheme} from 'react-native-paper';

export const enum Screens {
  FORM = 'form',
  RESULT = 'result',
}

export type RootStackParamList = {
  [Screens.FORM]: undefined;
  [Screens.RESULT]: {params: Exercise[]};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={Screens.FORM}
        screenOptions={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerTitleAlign: 'center',
          headerBackTitle: 'Search',
          headerTitleStyle: {color: theme.colors.background},
        }}>
        <RootStack.Screen
          name={Screens.FORM}
          component={Form}
          options={{
            headerTitle: 'Find your exercise',
          }}
        />
        <RootStack.Screen
          name={Screens.RESULT}
          component={ResultScreen}
          options={{
            headerTitle: '',
            headerTintColor: theme.colors.background,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
