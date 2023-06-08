import {StyleSheet, Text} from 'react-native';
export const LoadingComponent = () => {
  return <Text style={styles.loadingStyle}>Loading...</Text>;
};

const styles = StyleSheet.create({
  loadingStyle: {
    textAlign: 'center',
    color: 'gray',
    padding: 4,
  },
});
