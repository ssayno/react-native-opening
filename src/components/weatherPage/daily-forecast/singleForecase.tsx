import {Image, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../../constants/globalStyle';
import type {singleDailyProps} from '../../../constants/typeProps';
import {weatherImages} from '../../../constants/weatherImage';

export const SingleForecast = (props: singleDailyProps) => {
  // console.log(props.condition);
  return (
    <View style={styles.singleForecast}>
      <Image
        source={weatherImages[props.condition]}
        style={GlobalStyle.smallImage}
      />
      <Text>{props.date_}</Text>
      <Text>{props.temperature} &deg;C</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  singleForecast: {
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'gray',
    opacity: 0.7,
    padding: 4,
  },
});
