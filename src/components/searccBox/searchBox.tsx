import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {SearchList} from '../searchList/searchList';
import {searchListAutoComplete} from '../../utils/searchAutoComplete';
import {getWeatherForeCast} from "../../utils/getWeatherForecast";
import { LocationShow } from "../infoShow/locationShow";
import { WeatherImage } from "../infoShow/weatherImage";
import { TemperatureShow } from "../infoShow/temperature";
import { WeatherNameShow } from "../infoShow/weatherNameShow";
import { WindDistance } from "../infoShow/windDistance";
import { DropWater } from "../infoShow/dropWater";
import { TimeShow } from "../infoShow/timeShow";
import { DailyForecast } from "../daily-forecast/dailyForecast";
import {weatherImages} from "../../constants/weatherImage";

export const SearchBox: () => JSX.Element = () => {
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState(Array<object>);
  const [weather, setWeather] = useState({
    temperature: 34,
    weatherName: "Partly cloudy",
    distance: 34,
    dropWater: 34,
    timeNow: "6:00",
    forecast: []
  });

  const handleSearhKeyWithClick = (rAndc: string) => {
    setSearchKey(rAndc);
    // clear searchResult data
    setSearchResults([]);
    getWeatherForeCast({regionAndCountry: rAndc, days: 6}).then(data => {
      // console.log(`Current search box get forecast data is ${JSON.stringify(data)}`);
      const responseData = JSON.parse(JSON.stringify(data));
      const currentWeatherData = responseData['current'];
      const forecastWeatherData = responseData['forecast']['forecastday'];
      let tempForecast: { date_: string; temperature: string; }[] = [];
      for(let item of forecastWeatherData){
        tempForecast.push({
          date_: item.date,
          temperature: item['day']['avgtemp_c']
        })
      }
      setWeather(prevState => {
        return {...prevState,
          temperature: currentWeatherData.temp_c,
          weatherName: currentWeatherData.condition.text,
          distance: currentWeatherData.wind_kph,
          dropWater: currentWeatherData.wind_mph,
          timeNow: responseData.location.localtime.split(' ')[1],
          forecast: tempForecast
        }
      })


    })
  }

  const handleSearchChange = (e: string) => {
    setSearchKey(e);
    if (e.length > 2){
      searchListAutoComplete({searchKey: e}).then(resp => {
        console.log(`resp type is ${typeof resp}`);
        let newSearchResult: Array<object> = [];
        resp.map((i) => {
          newSearchResult.push({name: i.name, country: i.country});
          console.log(`a-b ${i.name}`);
        });
        setSearchResults(newSearchResult);
      });
    }
    console.log(searchKey);
  };

  const handleClick: () => void = () => {
    console.log(`Current show state is ${show}`);
    setShow(prevState => !prevState);
  };
  return (
    <>
      <View style={styles.searchBoxStyle}>
        {show ? (
          <TextInput
            style={styles.searchInput}
            placeholder="search city"
            value={searchKey}
            onChangeText={handleSearchChange}
            autoFocus={true}
            clearTextOnFocus={true}
            keyboardType={'default'}
            editable={true}
            spellCheck={false}
          />
        ) : null}
        <TouchableOpacity style={styles.searchButton} onPress={handleClick}>
          <Text>S</Text>
        </TouchableOpacity>

        {show && searchKey.length > 2 ? (
          <SearchList sList={searchResults} tempFunc={handleSearhKeyWithClick}/>
        ) : null}
      </View>
      <LocationShow rAndC={searchKey} />
      <WeatherImage imageUrl={weatherImages[weather.weatherName]}/>
      <TemperatureShow temperature={weather.temperature} />
      <WeatherNameShow name={weather.weatherName} />
      <View style={styles.smallInfoStyle}>
        <WindDistance distance={weather.distance}/>
        <DropWater dropWater={weather.dropWater}/>
        <TimeShow currentTime={weather.timeNow}/>
      </View>
      <DailyForecast forecast={weather.forecast}/>
    </>
  );
};
const styles = StyleSheet.create({
  searchBoxStyle: {
    height: 40,
    width: '100%',
    margin: 4,
    position: 'relative',
    zIndex: 1,
  },
  searchInput: {
    position: 'relative',
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    paddingLeft: 20,
  },
  smallInfoStyle: {
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: 'row',
    padding: 20,
  },
  searchButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
  },
});

