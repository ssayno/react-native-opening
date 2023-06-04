import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
type searchListProps = {
  sList: {
    name: string;
    country: string;
  }[];
  tempFunc: (x: string) => void;
};
type singleLineProps = {
  name: string;
  country: string;
  lastLine?: boolean;
  handleFunc: (x: string) => void;
};

const SearchResultLine = (props: singleLineProps) => {
  const handleGetWeatherForeCast = () => {
    const needForecastRegionAndCountry = `${props.name},${props.country}`;
    props.handleFunc(needForecastRegionAndCountry);
  };
  return (
    <TouchableOpacity onPress={handleGetWeatherForeCast}>
      <View
        style={[
          styles.singleLine,
          {borderBottomWidth: props.lastLine ? 2 : 0},
        ]}>
        <Text style={styles.colorText}>{props.name}, {props.country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const SearchList = (props: searchListProps) => {
  return (
    <View style={styles.searchList}>
      {props.sList.map((value, index) => {
        return (
          <SearchResultLine
            name={value.name}
            country={value.country}
            key={index}
            lastLine={index !== props.sList.length - 1}
            handleFunc={props.tempFunc}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  searchList: {
    position: 'absolute',
    backgroundColor: '#ccc',
    top: '100%',
    left: 20,
    right: 20,
    borderRadius: 20,
    zIndex: 2,
  },
  singleLine: {
    padding: 10,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    fontWeight: 500,
  },
  colorText: {
    color: 'yellow',
  },
});
