import type {singleMoveRightProps} from '../../constants/typeProps';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const SingleProduct = (props: {
  weneed: singleMoveRightProps;
  navigation: NativeStackNavigationProp<any>;
}) => {
  return (
    <TouchableOpacity
      style={styles.singleProductStyle}
      onPress={() => {
        console.log('product id is', props.weneed.id);
        props.navigation.navigate('ProductList', {
          itemId: props.weneed.id,
          page: 0,
        });
      }}>
      <Image
        source={{uri: props.weneed.filePath}}
        style={styles.singleProductImageStyle}
      />
      <Text style={styles.singleProductTextStyle}>{props.weneed.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleProductStyle: {
    marginTop: 10,
    width: '25%',
    height: 60,
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleProductImageStyle: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'black',
  },
  singleProductTextStyle: {
    textAlign: 'center',
  },
});
