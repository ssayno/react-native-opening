import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import {SearchList} from '../searchList/searchList';
import {searchListAutoComplete} from '../../../utils/searchAutoComplete';
import type { searchBoxProps, singleSearchResultProps } from "../../../constants/typeProps";
import useDebounce from "../../../hooks/useDebounce";

export const SearchBox: (props: searchBoxProps) => JSX.Element = (props: searchBoxProps) => {
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const deBounceValue = useDebounce(searchKey, 200);
  const [searchResults, setSearchResults] = useState(Array<{
    name: string;
    country: string;
  }>);

  const handleSearhKeyWithClick = useCallback((rAndc: string) => {
    setSearchKey('');
    console.log('What happened');
    setSearchResults([]);
    props.handleFunc({
      regionAndCountry: rAndc,
      days: 7,
    });
  }, [props.handleFunc])
  useEffect(() => {
    setSearchResults([]);
    // console.log(`debounce value is ${bounceValue}`);
    if (deBounceValue.length > 2){
      console.log('Start search');
      searchListAutoComplete({searchKey}).then(resp => {
        // console.log(`resp type is ${typeof resp}`);
        let newSearchResult: Array<singleSearchResultProps> = [];
        resp.map((i: singleSearchResultProps ) => {
          newSearchResult.push({name: i.name, country: i.country});
          // console.log(`a-b ${i.name}`);
        });
        setSearchResults(newSearchResult);
      }).catch(e => {
        Alert.alert(`weather searchbox ${e}`);
      })
    }
  }, [deBounceValue])
  const handleSearchChange = (e: string) => {
    setSearchKey(e);
    // console.log(`TextInput changed text now is ${searchKey}`);
  };

  const handleClick: () => void = () => {
    // console.log(`Current show state is ${show}`);
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
    </>
  );
};
const styles = StyleSheet.create({
  searchBoxStyle: {
    height: 40,
    width: '98%',
    position: 'relative',
    zIndex: 1,
    marginTop: 20,
  },
  searchInput: {
    position: 'relative',
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    paddingLeft: 20,
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

