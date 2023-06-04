import { StyleSheet, Text, View } from "react-native";
type weatherNameProps = {
  name: string;
};

export const WeatherNameShow = (props: weatherNameProps) => {
  return (
    <View>
      <Text style={styles.weatherNameStyle}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherNameStyle: {
    color: 'white',
    fontWeight: '200',
  },
});
