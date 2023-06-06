import {StyleSheet, Text} from 'react-native';

export const BottomDetailPage = () => {
  return <Text style={styles.bottomTextStyle}>已经到底了</Text>;
};

const styles = StyleSheet.create({
  bottomTextStyle: {
    color: 'gray',
    textAlign: 'center',
  },
});
