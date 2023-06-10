import type {
  getSingleCategoryFuncProp,
  productListProps,
  shoppingCarModalDataProp,
  singleProductProps,
} from '../../../constants/typeProps';
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getSingleCategoryFunc} from '../../../utils/getSingleCategory';
import {AddToShoppingCarModal} from '../../../modals/addToShoppingCar';
import {ProductCard} from '../productCard';
import {LoadingComponent} from '../loadingComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductStackParamList} from '../../../navigation/navigation';
import {RouteProp} from '@react-navigation/native';

type ProductListScreenProps = {
  navigation: StackNavigationProp<ProductStackParamList, 'ProductList'>;
  route: RouteProp<ProductStackParamList, 'ProductList'>;
};

export const ProductList = ({route, navigation}: ProductListScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {itemId, page} = route.params;
  const [modalInfo, setModalInfo] = useState<shoppingCarModalDataProp>({
    show: false,
    showContent: null,
  });
  const [productList, setProductList] = useState<productListProps>({
    listData: [],
    page: 0,
    total: 0,
  });
  const updateModalContent = (index: number) => {
    setModalInfo({
      show: true,
      showContent: productList.listData[index],
    });
  };
  const closeModal = () => {
    setModalInfo(prevState => ({...prevState, show: false}));
  };
  const handleWhenToEnd = () => {
    // FlatList onEndReached will conflict with ListFooterComponent, so we add loading status in here.
    if (loading) {
      return;
    }
    console.log(
      `page is ${productList.page}, all data length is ${productList.listData.length}`,
    );
    if (productList.page * 20 > productList.total) {
      console.log('Already fetch all data');
      return;
    }
    setLoading(true);
    const params: getSingleCategoryFuncProp = {
      itemId: itemId,
      page: page,
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
          num: item.num,
        });
      }
      setProductList(prevState => {
        console.log('preState page is', prevState.page);
        return {
          page: prevState.page + 1,
          total: data.total,
          listData: prevState.listData.concat(needData),
        };
      });
    });
  };
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [productList]);
  useEffect(() => {
    console.log('call when start');
    handleWhenToEnd();
  }, []);
  return (
    <>
      <FlatList
        data={productList.listData}
        style={styles.ProductListPage}
        numColumns={2}
        onEndReached={() => {
          console.log('reached end');
          handleWhenToEnd();
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={loading ? <LoadingComponent /> : <View />}
        renderItem={({item, index}) => {
          return (
            <ProductCard
              {...item}
              index={index}
              navigation={navigation}
              openShoppingCarModal={updateModalContent}
              key={index}
            />
          );
        }}
      />
      <AddToShoppingCarModal modalData={modalInfo} closeModal={closeModal} />
    </>
  );
};

const styles = StyleSheet.create({
  ProductListPage: {
    backgroundColor: 'lightgray',
  },
});
