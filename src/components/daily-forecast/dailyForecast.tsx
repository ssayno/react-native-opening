import { ScrollView, StyleSheet, Text, View } from "react-native";
import {SingleForecast} from './singleForecase';
import { GlobalStyle } from '../../constants/globalStyle';

type dfProps = {
  forecast: {
    date_: string;
    temperature: string;
  }[];
};

export const DailyForecast = (props: dfProps) => {
  return (
    <View style={styles.dailyForecast}>
      <View style={styles.dailyForecastHeader}>
        <Text style={GlobalStyle.smallTextStyle}>Daily Forecast</Text>
      </View>
      <ScrollView style={styles.dailyForecastBody} horizontal>
        {props.forecast?.map((value, index) => {
          return (
            <SingleForecast
              temperature={value.temperature}
              date_={value.date_}
              key={index}
            />)
          })
        }
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  dailyForecast: {
    width: '100%',
    flexDirection: 'column',
  },
  dailyForecastHeader: {
    padding: 10,
  },
  dailyForecastBody:{
  },
});
