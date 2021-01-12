import React from 'react';
import { BlurView } from '@react-native-community/blur';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import Star from './Star';

interface Props {
  visible: boolean;
  onClose: () => void;
  onRatingChanged: (rating: number) => void;
  children: React.ReactNode | React.ReactNodeArray;
  starSize: number;
  maxStars?: number;
  starRating?: number;
}

const { width, height } = Dimensions.get('screen');

const MODAL_HEIGHT = height * 0.25;

export const RatingBottomModal = (props: Props) => {
  if (!props.visible) {
    return null;
  }

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: height })).current;
  const [offset, setOffset] = React.useState(props.starRating || 0);
  const animatedWidth = React.useRef(0);

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

  React.useEffect(() => {
    props.onRatingChanged(offset);
  }, [offset]);

  React.useEffect(() => {
    if (!props.visible) {
      return;
    }

    openAnim();
  }, [props.visible]);

  const changeOffset = React.useCallback((e: GestureResponderEvent) => {
    const { nativeEvent } = e;

    const distance = (width - animatedWidth.current) / 2;
    const starSize = animatedWidth.current / 4;

    let v = Number((nativeEvent.pageX - distance) / starSize);

    const rest = v - Math.trunc(v);

    if (rest <= 0.5) {
      v = Math.trunc(v) + 0.5;
    } else {
      v = Math.trunc(v) + 1;
    }

    setOffset(v);
  }, []);

  const changeModalPosition = React.useCallback(
    (gs: PanResponderGestureState) => {
      const value = height - MODAL_HEIGHT + gs.dy;

      // prevent dragging too high or too low
      if (value >= height || value < height - MODAL_HEIGHT) {
        return;
      }

      pan.y.setValue(value);
    },
    [],
  );

  const responder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
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
      onPanResponderMove: (_, gs) => {
        changeModalPosition(gs);
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
      onStartShouldSetPanResponder: (e, gs) => {
        changeOffset(e);
        return true;
      },
      onPanResponderMove: (e, gs) => {
        // user swiped down on a star
        if (gs.dy > 10) {
          changeModalPosition(gs);
          return;
        }

        changeOffset(e);
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
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Animated.View
                  onLayout={(e) => {
                    animatedWidth.current = e.nativeEvent.layout.width;
                  }}
                  style={{ flexDirection: 'row' }}
                  {...responder2.panHandlers}>
                  {Array.from({ length: props.maxStars || 5 }).map((_, i) => {
                    return (
                      <Star
                        key={i}
                        size={props.starSize}
                        distance={8}
                        offset={offset - i}
                      />
                    );
                  })}
                </Animated.View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
