import {
  Animated,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const Avatar = ({imagePath}: {imagePath: ImageSourcePropType}) => {
  const animateValue = useRef(new Animated.Value(0)).current;
  //
  let [animationStartOrNot, setAnimationStartOrNot] = useState(false);
  const positiveAnimationDeg = animateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const rotatePositive = useMemo(() => {
    return Animated.timing(animateValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
  }, [animateValue]);
  const rotateNegative = useMemo(() => {
    return Animated.timing(animateValue, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    });
  }, [animateValue]);
  const startRotateAvatar = useCallback(() => {
    if (!animationStartOrNot) {
      setAnimationStartOrNot(prevState => !prevState);
      Animated.sequence([rotatePositive, rotateNegative]).start(() => {
        setAnimationStartOrNot(false);
      });
    }
  }, [animationStartOrNot, rotateNegative, rotatePositive]);
  useEffect(() => {
    startRotateAvatar();
  }, []);
  return (
    <TouchableOpacity style={styles.avatarImageBox} onPress={startRotateAvatar}>
      <Animated.Image
        source={imagePath}
        style={[
          styles.avatarImage,
          {transform: [{rotate: positiveAnimationDeg}]},
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarImageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'gray',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
