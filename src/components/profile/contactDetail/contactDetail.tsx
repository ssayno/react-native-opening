import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useMemo, memo, useCallback} from 'react';
import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../../../navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

type contactProps = {
  name: string;
  content: string;
};

const ContactBox = ({name, content}: contactProps) => {
  const getRandomColor = useCallback(() => {
    const rgb = new Array(3)
      .fill(0)
      .map(_ => Math.floor(Math.random() * 255).toString());
    const alpha = Math.random();
    return `rgba(${rgb.join(',')}, ${(alpha < 0.1 ? 0.5 : alpha.toFixed(2))})`;
  }, []);
  const borderColor = useMemo(() => {
    return getRandomColor();
  }, [getRandomColor]);
  console.log(borderColor);
  return (
    <View style={[styles.contactBox, {borderColor}]}>
      <View style={styles.contactNameBox}>
        <Text style={styles.contactName}>{name}</Text>
      </View>
      <View style={styles.contactContentBox}>
        <Text style={styles.contactContent}>{content}</Text>
      </View>
    </View>
  );
};

type contactDetailProp = {
  route: RouteProp<ProfileStackParamList>;
  navigation: StackNavigationProp<ProfileStackParamList>;
};

const ContactDetail = ({route, navigation}: contactDetailProp) => {
  const tempData: Array<contactProps> = [
    {
      name: 'QQ',
      content: 'xxxxxxxxx',
    },
    {
      name: 'WeChat',
      content: 'xxxxxxxxx',
    },
    {
      name: 'GMail',
      content: 'xxxxxxxxx',
    },
    {
      name: 'QQ Email',
      content: 'xxxxxxxxx',
    },
  ];
  useEffect(() => {
    console.log('refresh contact page');
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>{route.name}</Text>
      <FlatList
        data={tempData}
        renderItem={({item, index}) => <ContactBox {...item} key={index} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contactBox: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 6,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderStyle: 'solid',
  },
  contactNameBox: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  contactContentBox: {
    borderColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  contactName: {
    fontSize: 20,
    fontWeight: '600',
  },
  contactContent: {
    textAlign: 'center',
  },
});
export default memo(ContactDetail);
