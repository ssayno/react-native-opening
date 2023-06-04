/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet, Text,
  useColorScheme,
  View
} from "react-native";

import {OwnDimension} from './src/utils/get_device_dimension';
import {SearchBox} from './src/components/searccBox/searchBox';
import {LocationShow} from './src/components/infoShow/locationShow';
import {WeatherImage} from './src/components/infoShow/weatherImage';
import {TemperatureShow} from './src/components/infoShow/temperature';
import {WeatherNameShow} from './src/components/infoShow/weatherNameShow';
import {WindDistance} from './src/components/infoShow/windDistance';
import {DropWater} from './src/components/infoShow/dropWater';
import {TimeShow} from './src/components/infoShow/timeShow';
import {DailyForecast} from './src/components/daily-forecast/dailyForecast';
import {weatherImages} from './src/constants/weatherImage';
import {getWeatherForeCast} from './src/utils/getWeatherForecast';
import type {
  completeParams,
  singleDailyProps,
  weatherProps,
} from './src/constants/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [weather, setWeather] = useState<weatherProps>(null);
  let startStorage: React.MutableRefObject<boolean> = useRef(false);
  const asyncStorageData = useCallback(async (weather_: weatherProps) => {
    const response = await AsyncStorage.setItem(
      'latestData',
      JSON.stringify(weather_),
    );
    console.log('Storage function is finished');
    return response;
  }, []);
  const asyncFetchData = useCallback(async () => {
    // always return string, change null to string, holy shit.
    const storedData: string | null = await AsyncStorage.getItem('latestData');
    return storedData !== 'null'
      ? JSON.parse(storedData as string)
      : handleWeatherForecast({regionAndCountry: 'Xiangtan,China', days: 7});
  }, []);
  useEffect(() => {
    asyncFetchData().then(data => {
      console.log(`Fetch data is ${data}`);
      if (data) {
        setWeather(data);
      }
    });
  }, []);
  useEffect(() => {
    // console.log(startStorage.current);
    if (weather !== null) {
      if (startStorage.current) {
        asyncStorageData(weather).then(data => {
          console.log(`Storage response is ${data}`);
        });
      } else {
        startStorage.current = true;
      }
    }
  }, [asyncStorageData, weather]);
  const handleWeatherForecast = (params: completeParams) => {
    getWeatherForeCast(params).then(data => {
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
    });
    return null;
  };
  if (!weather) {
    return <Text>loading</Text>;
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Image
        style={styles.backgroundImage}
        source={require('./assets/images/bg.png')}
        blurRadius={70}
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
    </SafeAreaView>
  );
}

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
export default App;
