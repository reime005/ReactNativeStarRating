import * as React from 'react';
import { useColorScheme, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import '../../config/i18n';
import { BottomNavigator } from '../../navigators/BottomNavigator';
import { darkTheme, lightTheme } from '../../config/theme';
import { RatingBottomModal } from './modal';
import { DragAndSnap } from '../DragAndSnap/DragAndSnap';
import Star from './Star';

export const Main = () => {
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = React.useState(true);

  return (
    <NavigationContainer>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
                backgroundColor: 'green',
              }}
              onPress={() => setModalVisible(true)}
            />
            <DragAndSnap />
            <DragAndSnap />
            <DragAndSnap />
            <DragAndSnap />
            <DragAndSnap />
            <DragAndSnap />
            <RatingBottomModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}>
              <Star />
            </RatingBottomModal>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
