import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// use temp data for stastic page draw
// import {tempData} from '../constants/temp_';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomDetailPage} from '../components/products/bottomDetailPage';

const HeaderProductDetail = ({ext, fp}) => {
  return (
    <View>
      <View style={styles.rotationStyles}>
        <Image source={{uri: fp.fileUrl}} style={styles.firstPic} />
      </View>
      <View style={styles.priceStyle}>
        <Text style={styles.priceTextStyle}>帮扶价</Text>
        <Text style={styles.priceTextStyle}>
          {ext.adviceRetailPrice} 市场价: {ext.costPrice}
        </Text>
      </View>
      <View style={styles.detailInfo}>
        <View style={styles.volumeStyle}>
          <Text style={styles.orangeText}>{ext.productAbstract}</Text>
          <Text style={styles.volumeTextStyle}>销量{ext.tradingVolume}</Text>
        </View>
        <View style={styles.productCompanyStyle}>
          <Image
            source={{uri: ext.openShopApplyDTO.logoFileList[0].fileUrl}}
            style={styles.logoImage}
          />
          <Text>{ext.openShopApplyDTO.custName}</Text>
          <TouchableOpacity>
            <View style={styles.collectionStyle}>
              <Icon name={'heart-o'} size={13} />
              <Text>收藏</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const ProductDetail = props => {
  const data = props.route.params.respData;
  const ext = data.ext;
  const filds = ext.fild;
  const firstFild = filds[0];
  const productDesc = ext.productDesc;
  const rg = /img.*?src="(https.*?)"/g;
  const productDescPic = productDesc
    .match(rg)
    ?.map(i => i.slice(9, i.length - 1));

  // console.log(`Picture address is ${productDescPic}`);
  return (
    <FlatList
      data={productDescPic}
      ListHeaderComponent={<HeaderProductDetail ext={ext} fp={firstFild} />}
      maxToRenderPerBatch={5}
      ListFooterComponent={<BottomDetailPage />}
      renderItem={({item, index}) => {
        return (
          <Image
            key={index}
            source={{uri: item}}
            style={{width: '100%', height: 500, resizeMode: 'contain'}}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  detailPage: {
    flex: 1,
    width: '100%',
    height: undefined,
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
  },
  rotationStyles: {
    width: '100%',
    height: 375,
  },
  firstPic: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // borderStyle: 'solid',
    // borderWidth: 3,
    // borderColor: 'yellow',
  },
  priceStyle: {
    backgroundColor: 'red',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  priceTextStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  detailInfo: {
    // backgroundColor: 'green',
    padding: 8,
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'black',
  },
  volumeStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  orangeText: {
    color: 'orange',
    fontSize: 12,
  },
  volumeTextStyle: {
    fontSize: 13,
  },
  productCompanyStyle: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collectionStyle: {
    alignItems: 'center',
  },
});
