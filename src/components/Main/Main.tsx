import * as React from 'react';
import { useColorScheme, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import '../../config/i18n';
import { darkTheme, lightTheme } from '../../config/theme';
import { RatingBottomModal } from './Modal';
import BookList from './BookList';

export const Main = () => {
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <NavigationContainer>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <BookList toggleModal={() => setModalVisible(true)} />

            <RatingBottomModal
              visible={modalVisible}
              starSize={50}
              starRating={0}
              maxStars={5}
              onRatingChanged={(r) => console.log(r)}
              onClose={() => setModalVisible(false)}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
