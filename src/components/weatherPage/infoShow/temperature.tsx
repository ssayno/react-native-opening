import { StyleSheet, Text, View } from "react-native";

type temperatureProps = {
  temperature: number;
};

export const TemperatureShow = (props: temperatureProps) => {
  return (
    <View>
      <Text style={styles.temperatureText}>{props.temperature} &deg;C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  temperatureText: {
    color: 'white',
    fontSize: 28,
  },
});
