import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import type {
  movieSideProp,
  singleMoveRightProps,
  singleMovieSideProp,
} from '../constants/typeProps';
import {getProductCategories} from '../utils/get_product';
import {SingleProduct} from '../components/products/singleProduct';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Separator = () => {
  return <View style={styles.separator} />;
};

export const Product = (props: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const [currentMovies, setCurrentMovies] = useState<movieSideProp>({
    allData: null,
    currentIndex: -1,
  });
  useEffect(() => {
    getProductCategories().then(data => {
      let updatedMovies: Array<singleMovieSideProp> = [];
      const productExtData = data.ext;
      for (let item of productExtData) {
        updatedMovies.push({
          sideBarName: item.name,
          correspondingData: item.children.map((i: singleMoveRightProps) => {
            return {
              name: i.name,
              filePath: i.filePath,
              id: i.id,
            };
          }),
        });
      }
      setCurrentMovies({
        allData: updatedMovies,
        currentIndex: 0,
      });
    });
  }, []);
  const handleLeftClick = (index_: number) => {
    setCurrentMovies(prevState => {
      return {...prevState, currentIndex: index_};
    });
  };
  return (
    <SafeAreaView style={styles.movieBg}>
      <StatusBar />
      <View style={styles.sideLeft}>
        <FlatList
          data={currentMovies.allData}
          contentContainerStyle={styles.sideLeftFlatList}
          ItemSeparatorComponent={Separator}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.sideLeftButton,
                  {
                    backgroundColor:
                      index === currentMovies.currentIndex ? 'white' : '#ccc',
                  },
                ]}
                key={index}
                onPress={() => handleLeftClick(index)}>
                <Text>{item.sideBarName}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.sideRight}>
        {/*<Text>{currentMovies.currentIndex}, {currentMovies.allData?.length}*/}
        {/*  {currentMovies.allData && currentMovies.allData[currentMovies.currentIndex].sideBarName}*/}
        {/*</Text>*/}
        {currentMovies.allData &&
          currentMovies.allData[
            currentMovies.currentIndex
          ].correspondingData.map(i => {
            return (
              <SingleProduct
                weneed={i}
                key={Math.random()}
                navigation={props.navigation}
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieBg: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  sideLeft: {
    flex: 1,
    // backgroundColor: 'green',
    backgroundColor: '#ccc',
  },
  sideLeftFlatList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sideRight: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  sideLeftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomStyle: 'solid',
    // borderBottomWidth: 2,
    // borderBottomColor: 'black',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
});
