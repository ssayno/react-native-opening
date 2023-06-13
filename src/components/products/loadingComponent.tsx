import {Animated, StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef} from 'react';
export const LoadingComponent = () => {
  const animatedPositiveValue = useRef(new Animated.Value(0)).current;
  const positiveX = animatedPositiveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });
  const negativeX = animatedPositiveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -10],
  });
  const positiveScale = animatedPositiveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  const negativeScale = animatedPositiveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  useEffect(() => {
    const parallelLoopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedPositiveValue, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(animatedPositiveValue, {
          duration: 1000,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    console.log('loading animation start');
    parallelLoopAnimation.start();
    return () => {
      parallelLoopAnimation.stop();
      console.log('loading animation stop');
    };
  }, []);
  return (
    <View style={styles.loadingBox}>
      <Animated.View
        style={[
          {
            transform: [{translateX: positiveX }, {scale: positiveScale}],
          },
          styles.fItem,
          styles.rotateItem,
        ]}
      />
      <Animated.View
        style={[
          {
            transform: [{translateX: negativeX}, {scale: negativeScale}],
          },
          styles.sItem,
          styles.rotateItem,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    position: 'relative',
    flex: 1,
    textAlign: 'center',
    rowGap: 10,
    alignItems: 'center',
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  rotateItem: {
    left: '50%',
    top: '50%',
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  fItem: {
    backgroundColor: 'red',
  },
  sItem: {
    backgroundColor: 'blue',
  },
});
