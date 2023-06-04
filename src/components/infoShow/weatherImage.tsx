import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

type wiProps = {
  imageUrl: ImageSourcePropType;
};
export const WeatherImage = (props: wiProps) => {
  return <Image source={props.imageUrl} style={styles.imageStyle} />;
};

const styles = StyleSheet.create({
  imageStyle: {
    height: '25%',
    resizeMode: 'contain',
  },
});
