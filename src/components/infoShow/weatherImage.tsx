import { Image, StyleSheet } from "react-native";

type wiProps = {
  imageUrl: string;
};
export const WeatherImage = (props: wiProps) => {
  return (
    <Image
      source={props.imageUrl}
      style={styles.imageStyle}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '50%',
    height: '30%',
  },
});
