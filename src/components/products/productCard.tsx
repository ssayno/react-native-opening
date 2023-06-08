import {getProductDetailFunc} from '../../utils/getProductDetail';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {productCardProps} from '../../constants/typeProps';

export const ProductCard = (props: productCardProps) => {
  const toProductDetailPage = (pId: number) => {
    props.navigation.navigate('ProductDetail', {
      itemId: pId,
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toProductDetailPage(props.productId);
      }}>
      <View style={styles.singleProduct}>
        <Image
          source={{uri: props.mainImg}}
          style={styles.singleProductImage}
        />
        <View style={styles.singleProductText}>
          <Text style={styles.nameStyle}>{props.productName}</Text>
          <View style={styles.shoppingAndPrice}>
            <View>
              <Text style={styles.discountPriceStyle}>
                帮扶价: ¥{props.adviceRetailPrice}
              </Text>
              <Text style={styles.previousPriceStyle}>
                市场价:
                <Text style={styles.deleteStyle}> ¥{props.productPrice}</Text>
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => props.openShoppingCarModal(props.index)}>
              <Icon name="shopping-cart" size={20} color={'red'} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  singleProduct: {
    width: '44%',
    height: 200,
    margin: '3%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 4,
  },
  singleProductImage: {
    width: '60%',
    height: '55%',
    resizeMode: 'contain',
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'black',
  },
  singleProductText: {
    height: '45%',
    justifyContent: 'center',
  },
  shoppingAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameStyle: {
    height: '50%',
    fontSize: 10,
    textAlign: 'center',
  },
  discountPriceStyle: {
    textAlign: 'left',
    fontSize: 12,
    color: 'red',
  },
  previousPriceStyle: {
    fontSize: 12,
    textAlign: 'left',
    color: 'gray',
  },
  deleteStyle: {
    textDecorationLine: 'line-through',
    color: 'lightgray',
  },
});
