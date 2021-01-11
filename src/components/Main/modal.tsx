import React from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

interface Props {
  visible: boolean;
}

const { width, height } = Dimensions.get('screen');

const MODAL_HEIGHT = height * 0.25;

export const RatingBottomModal = (props: Props) => {
  if (!props.visible) {
    return null;
  }

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: height })).current;

  const openAnim = () => {
    Animated.spring(pan.y, {
      toValue: height - MODAL_HEIGHT,
      useNativeDriver: true,
    }).start();
  };

  const closeAnim = () => {
    Animated.spring(pan.y, {
      toValue: height,
      useNativeDriver: true,
    }).start();
  };

  React.useLayoutEffect(() => {
    if (!props.visible) {
      return;
    }

    openAnim();
  }, []);

  const responder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e) => {
        // check if touch is in the modal area
        if (e.nativeEvent.pageY > height - MODAL_HEIGHT) {
          return true;
        }

        console.warn('close');
        return false;
      },
      onPanResponderGrant: () => {
        // TODO: show some visual feedback here
      },
      onPanResponderMove: (_, { dy }) => {
        const value = height - MODAL_HEIGHT + dy;

        // prevent dragging too high or too low
        if (value >= height || value < height - MODAL_HEIGHT) {
          return;
        }

        pan.y.setValue(value);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < MODAL_HEIGHT / 2) {
          openAnim();
        } else {
          closeAnim();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...responder.panHandlers}
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: 'rgba(0,0,0,.1)',
        },
      ]}>
      <View>
        <Animated.View
          style={{
            transform: [
              {
                translateY: pan.y,
              },
            ],
          }}>
          <View
            style={{
              width: '100%',
              height: MODAL_HEIGHT,
              backgroundColor: '#fff',
            }}></View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
