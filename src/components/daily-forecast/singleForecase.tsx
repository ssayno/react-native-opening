import {Image, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/globalStyle';

type sfProps = {
  date_: string;
  temperature: string;
};
export const SingleForecast = (props: sfProps) => {
  return (
    <View style={styles.singleForecast}>
      <Image
        source={require('../../../assets/images/heavyrain.png')}
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
