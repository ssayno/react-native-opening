import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {shoppingCarModalDataProp} from '../constants/typeProps';
import {useState} from 'react';

type shoppingCarModal = {
  modalData: shoppingCarModalDataProp;
  closeModal: () => void;
};

// remember add half part modal
export const AddToShoppingCarModal = ({
  modalData,
  closeModal,
}: shoppingCarModal) => {
  const [addNumber, setAddNumber] = useState<number>(0);
  const handleAddNumberChanged = (value: string) => {
    if (/^\d+$/.test(value)) {
      setAddNumber(parseInt(value, 10));
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={modalData.show}
      transparent={true}
      onShow={() => {
        console.log('modal show');
      }}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.grayPart} />
        </TouchableWithoutFeedback>

        <View style={styles.shoppingCar}>
          {modalData.showContent && (
            <>
              <View style={styles.scFirstLine}>
                <View style={styles.scFirstImageBox}>
                  <Image
                    source={{uri: modalData.showContent.mainImg}}
                    style={styles.modalImage}
                  />
                </View>
                <View style={styles.scFirstLineTextBox}>
                  <Text style={styles.scFirstLinePrice}>
                    ¥ {modalData.showContent.adviceRetailPrice}
                  </Text>
                  <Text style={styles.scFirstLineInventory}>
                    库存 {modalData.showContent.num}
                  </Text>
                </View>
              </View>
              <View style={styles.separatorLine} />
              <View style={styles.scSecondLine}>
                <Text style={{fontWeight: '700'}}>规格</Text>
                <View style={styles.scSecondLineNameBox}>
                  <Text style={styles.scFirstLineInventory}>
                    {modalData.showContent.productName}
                  </Text>
                </View>
              </View>
              <View style={[styles.buyBox]}>
                <Text>购买数量</Text>
                <View style={[styles.buyButtonBox]}>
                  <TouchableOpacity
                    style={[styles.addOrSubtractButton, styles.grayBox]}
                    onPress={() => setAddNumber(prevState => prevState - 1)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    keyboardType={'numeric'}
                    style={[styles.buyNumberInput, styles.grayBox]}
                    value={addNumber.toString()}
                    onChangeText={handleAddNumberChanged}
                  />
                  <TouchableOpacity
                    style={[styles.addOrSubtractButton, styles.grayBox]}
                    onPress={() => setAddNumber(prevState => prevState + 1)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          <TouchableOpacity style={styles.addToShoppingCar}>
            <Text style={styles.addText}>加入购物车</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shoppingCarModal: {},
  grayPart: {
    height: '50%',
    backgroundColor: 'black',
    opacity: 0.6,
  },
  shoppingCar: {
    position: 'relative',
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
  },
  scFirstLine: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  scFirstImageBox: {
    margin: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgray',
  },
  scFirstLineTextBox: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  scFirstLinePrice: {
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },
  scFirstLineInventory: {
    fontSize: 10,
    color: 'black',
    fontWeight: '600',
  },
  separatorLine: {
    width: '90%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: 'gray',
  },
  modalImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  scSecondLine: {
    padding: 6,
    alignItems: 'flex-start',
  },
  scSecondLineNameBox: {
    borderWidth: 1,
    padding: 6,
    margin: 10,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  buyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyButtonBox: {
    flexDirection: 'row',
  },
  buyNumberInput: {
    width: 60,
    height: 20,
    textAlign: 'center',
  },
  addOrSubtractButton: {
    width: 20,
    alignItems: 'center',
  },
  grayBox: {
    borderStyle: 'solid',
    borderColor: 'lightgray',
    alignItems: 'center',
    borderWidth: 1,
    alignContent: 'center',
  },
  addToShoppingCar: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addText: {
    fontWeight: '600',
    color: 'white',
  },
});
