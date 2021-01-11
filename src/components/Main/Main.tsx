import * as React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import '../../config/i18n';
import { BottomNavigator } from '../../navigators/BottomNavigator';
import { darkTheme, lightTheme } from '../../config/theme';
import { RatingBottomModal } from './modal';
import { DragAndSnap } from '../DragAndSnap/DragAndSnap';

export const Main = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <DragAndSnap />
            <RatingBottomModal visible />
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
