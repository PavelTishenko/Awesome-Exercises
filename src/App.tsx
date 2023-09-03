import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';

import Navigation from './navigation';
import {store} from './store/store';

IconFontAwesome.loadFont();

function App(): JSX.Element {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
  return (
    <PaperProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </PaperProvider>
  );
}

export default App;
