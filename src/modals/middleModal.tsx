import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';

export const MiddleModal = () => {
  const [show, setShow] = useState(true);
  return (
    <Modal visible={show} transparent={true}>
      <TouchableHighlight
        style={styles.otherStyles}
        onPress={() => setShow(false)}>
        <View style={styles.middleStyles}>
          <TouchableOpacity
            onPress={() => {
              setShow(false);
            }}>
            <Text>click me to close this modal</Text>
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = StyleSheet.create({
  middleStyles: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -100}, {translateY: -100}],
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherStyles: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
});
