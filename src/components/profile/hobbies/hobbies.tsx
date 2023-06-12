import { SafeAreaView, StyleSheet, Text } from "react-native";

export const Hobbies = () => {
  return (
    <SafeAreaView>
      <Text style={styles.textAreaStyle}>
        个人兴趣爱好广泛，对于计算机这个方向，什么都想学，确实是很感兴趣，多而不精，但是我还是有自己
      擅长的领域，比如说 Python，Linux（不知是否算深入），Web 开发（我最感兴趣的东西）</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textAreaStyle: {
    padding: 10,
    fontWeight: '500',
    color: 'black',
    margin: 10,
    backgroundColor: 'deepskyblue',
  },
});
