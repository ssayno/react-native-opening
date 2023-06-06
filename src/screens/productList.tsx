import type {
  getSingleCategoryFuncProp, productCardProps,
  productListPageProp,
  productListProps,
  singleProductProps
} from "../constants/typeProps";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {getSingleCategoryFunc} from '../utils/getSingleCategory';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProductDetailFunc } from "../utils/getProductDetail";

const LoadingComponent = () => {
  return <Text style={styles.loadingStyle}>loading..</Text>;
};
const ProductCard = (props: productCardProps) => {
  const toProductDetailPage = (pId: number) => {
    getProductDetailFunc(pId).then(data => {
      props.navigation.navigate('ProductDetail', {
        respData: data,
      });
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => {toProductDetailPage(props.productId)}}>
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
            <TouchableWithoutFeedback>
              <Icon name="shopping-cart" size={20} color={'red'} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ProductList = (props: productListPageProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<productListProps>({
    listData: [],
    page: 0,
    total: 0,
  });
  const handleWhenToEnd = useCallback(() => {
    setLoading(true);
    if (productList.page * 20 > productList.total) {
      console.log('Already fetch all data');
      return;
    }
    const params: getSingleCategoryFuncProp = {
      itemId: props.route.params?.itemId,
      page: productList.page,
    };
    getSingleCategoryFunc(params).then(data => {
      const rowData = data.rows;
      const needData: Array<singleProductProps> = [];
      for (let item of rowData) {
        needData.push({
          mainImg: item.mainImg,
          productName: item.productName,
          adviceRetailPrice: item.adviceRetailPrice,
          productPrice: item.productPrice,
          productId: item.productId,
        });
      }
      setProductList(prevState => {
        return {
          page: prevState.page + 1,
          total: data.total,
          listData: prevState.listData.concat(needData),
        };
      });
    });
  }, []);
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [productList]);
  useEffect(() => {
    handleWhenToEnd();
  }, [handleWhenToEnd]);
  return (
    <FlatList
      data={productList.listData}
      style={styles.ProductListPage}
      numColumns={2}
      onEndReached={handleWhenToEnd}
      // onEndReachedThreshold={0}
      renderItem={({item, index}) => {
        return <ProductCard {...item} navigation={props.navigation} key={index} />;
      }}
      ListFooterComponent={loading ? <LoadingComponent /> : null}
    />
  );
};

const styles = StyleSheet.create({
  ProductListPage: {
    backgroundColor: 'lightgray',
  },
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
  loadingStyle: {
    textAlign: 'center',
    color: 'gray',
    padding: 4,
  },
});
