import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  completeParams,
  singleDailyProps,
  weatherProps,
} from '../constants/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWeatherForeCast} from '../utils/getWeatherForecast';
import {SearchBox} from '../components/weatherPage/searccBox/searchBox';
import {LocationShow} from '../components/weatherPage/infoShow/locationShow';
import {WeatherImage} from '../components/weatherPage/infoShow/weatherImage';
import {TemperatureShow} from '../components/weatherPage/infoShow/temperature';
import {WeatherNameShow} from '../components/weatherPage/infoShow/weatherNameShow';
import {WindDistance} from '../components/weatherPage/infoShow/windDistance';
import {DropWater} from '../components/weatherPage/infoShow/dropWater';
import {TimeShow} from '../components/weatherPage/infoShow/timeShow';
import {DailyForecast} from '../components/weatherPage/daily-forecast/dailyForecast';
import {OwnDimension} from '../utils/get_device_dimension';
import {weatherImages} from '../constants/weatherImage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MiddleModal} from '../modals/middleModal';
import { LoadingComponent } from "../components/products/loadingComponent";

type weatherComponentProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const Weather = (props: weatherComponentProps) => {
  // AsyncStorage.clear().then();
  const [weather, setWeather] = useState<weatherProps>(null);
  let startStorage: React.MutableRefObject<boolean> = useRef(false);
  const asyncStorageData = useCallback(async (real: completeParams) => {
    const response = await AsyncStorage.setItem(
      'latestData',
      JSON.stringify(real),
    );
    console.log('Storage function is finished');
    return response;
  }, []);
  const asyncFetchData = useCallback(async () => {
    // always return string, change null to string, holy shit.
    const storedData: string | null = await AsyncStorage.getItem('latestData');
    return storedData ? JSON.parse(storedData) : null;
  }, []);
  useEffect(() => {
    asyncFetchData().then(data => {
      let searchParams;
      console.log(`async storage fetch data is ${data}`);
      if (!data) {
        searchParams = {regionAndCountry: 'Maoming,China', days: 7};
      } else {
        searchParams = data;
      }
      handleWeatherForecast(searchParams);
      startStorage.current = true;
    });
  }, []);
  const handleWeatherForecast = (params: completeParams) => {
    console.log(`Params is ${params}`);
    if (startStorage.current) {
      asyncStorageData(params).then(data => {
        console.log(`Storage response is ${data}`);
      });
    }
    getWeatherForeCast(params)
      .then(data => {
        // console.log(`Current search box get forecast data is ${JSON.stringify(data)}`);
        const responseData = JSON.parse(JSON.stringify(data));
        const currentWeatherData = responseData.current;
        const forecastWeatherData = responseData.forecast.forecastday;
        let tempForecast: Array<singleDailyProps> = [];
        for (let item of forecastWeatherData) {
          tempForecast.push({
            date_: item.date,
            temperature: item.day.avgtemp_c,
            condition: item.day.condition.text,
          });
        }
        // setWeather(prevState => ({...prevState, forecast: tempForecast}));
        setWeather((prevState: weatherProps) => {
          return {
            ...prevState,
            regionAndCountry: params.regionAndCountry,
            temperature: currentWeatherData.temp_c,
            weatherName: currentWeatherData.condition.text,
            distance: currentWeatherData.wind_kph,
            dropWater: currentWeatherData.wind_mph,
            timeNow: responseData.location.localtime.split(' ')[1],
            forecast: tempForecast,
          };
        });
      })
      .catch(e => {
        console.log('weather error');
        Alert.alert('Weather main Error', `${e}`);
      });
    return null;
  };
  if (!weather) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar />
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/bg.png')}
        blurRadius={70}
      />

      <Button
        title={'click'}
        onPress={() => props.navigation.push('WeatherNext')}
      />
      <SearchBox handleFunc={handleWeatherForecast} />
      <LocationShow rAndC={weather.regionAndCountry} />
      <WeatherImage imageUrl={weatherImages[weather.weatherName]} />
      <TemperatureShow temperature={weather.temperature} />
      <WeatherNameShow name={weather.weatherName} />
      <View style={styles.smallInfoStyle}>
        <WindDistance distance={weather.distance} />
        <DropWater dropWater={weather.dropWater} />
        <TimeShow currentTime={weather.timeNow} />
      </View>
      <DailyForecast forecast={weather.forecast} />
      <MiddleModal />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    position: 'absolute',
    width: OwnDimension.width,
    height: OwnDimension.height,
  },
  smallInfoStyle: {
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: 'row',
    padding: 20,
  },
});
