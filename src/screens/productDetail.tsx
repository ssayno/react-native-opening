import type {
  getSingleCategoryFuncProp,
  productDetailProps,
  productListProps,
  singleProductProps,
} from '../constants/typeProps';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {getSingleCategoryFunc} from '../utils/getSingleCategory';

// @ts-ignore
const ProductCard = ({props}) => {
  return (
    <View style={styles.singleProduct}>
      <Image source={{uri: props.mainImg}} style={styles.singleProductImage} />
      <View style={styles.singleProductText}>
        <Text style={styles.nameStyle}>{props.productName}</Text>
        <Text style={styles.discountPriceStyle}>
          帮扶价: ¥{props.adviceRetailPrice}
        </Text>
        <Text style={styles.previousPriceStyle}>
          市场价: <Text style={styles.deleteStyle}> ¥{props.productPrice}</Text>
        </Text>
      </View>
    </View>
  );
};

export const ProductDetail = (props: productDetailProps) => {
  const [productList, setProductList] = useState<productListProps>({
    listData: [],
    page: 0,
    total: 0,
  });
  const handleWhenToEnd = useCallback(() => {
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
    handleWhenToEnd();
  }, [handleWhenToEnd]);
  return (
    <FlatList
      data={productList.listData}
      style={styles.productDetailPage}
      numColumns={2}
      onEndReached={handleWhenToEnd}
      renderItem={({item, index}) => {
        return <ProductCard props={item} key={index} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  productDetailPage: {
    backgroundColor: 'lightgray',
  },
  singleProduct: {
    width: '44%',
    height: 200,
    margin: '3%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'space-around',
    // backgroundColor: 'red',
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
