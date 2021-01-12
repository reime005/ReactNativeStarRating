import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutRectangle,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import Star from './Star';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNodeArray;
}

const { width, height } = Dimensions.get('screen');

const MODAL_HEIGHT = height * 0.25;

export const RatingBottomModal = (props: Props) => {
  if (!props.visible) {
    return null;
  }

  const [offset, setOffset] = React.useState(0);

  const starBoxLayout = React.useRef<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: height })).current;

  const openAnim = () => {
    Animated.spring(pan.y, {
      toValue: height - MODAL_HEIGHT,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeAnim = () => {
    Animated.spring(pan.y, {
      toValue: height,
      useNativeDriver: true,
    }).start();

    // you may invoke it in the animation end callback, but
    // that may feel slower
    props.onClose();
  };

  React.useLayoutEffect(() => {
    if (!props.visible) {
      return;
    }

    openAnim();
  }, []);

  const responder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        const { pageY, pageX } = e.nativeEvent;

        console.warn('lower');

        const upperMost = starBoxLayout.current.y + height - MODAL_HEIGHT;
        const lowerMost =
          starBoxLayout.current.y +
          starBoxLayout.current.height +
          height -
          MODAL_HEIGHT;

        // if (pageY <= upperMost && pageY >= lowerMost) {
        //   console.warn('1');
        // }

        // if (pageY >= upperMost && pageY <= lowerMost) {
        //   console.warn('1');
        // }

        // console.warn(e.nativeEvent.pageY);

        // check if touch is in the modal area
        if (e.nativeEvent.pageY > height - MODAL_HEIGHT) {
          return true;
        }

        closeAnim();

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

  const responder2 = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        return true;
      },
      onPanResponderMove: ({ nativeEvent }, {}) => {
        const v = (nativeEvent.locationX / 70);

        setOffset(v);
      },
      onPanResponderRelease: (_, { dy }) => {},
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
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View>
        <Animated.View
          style={{
            opacity: pan.y.interpolate({
              inputRange: [height - MODAL_HEIGHT, height],
              outputRange: [1, 0.5],
            }),
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
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 24,
              }}>
              <Animated.View {...responder2.panHandlers}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                  onLayout={(e) =>
                    (starBoxLayout.current = e.nativeEvent.layout)
                  }>
                  {Array.from({ length: 5 }).map((_, i) => {
                    return <Star key={i} offset={offset - i} />;
                  })}
                </View>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
