import {
  Button,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Avatar = ({imagePath}: {imagePath: ImageSourcePropType}) => {
  return (
    <View style={styles.avatarImageBox}>
      <Image source={imagePath} style={styles.avatarImage} />
    </View>
  );
};
const NameAndMotto = () => {
  return (
    <View style={styles.nAndM}>
      <Text style={styles.nAndMName}>Vzgoll</Text>
      <Text style={styles.nAndMMotto}>Open in the virtual world.</Text>
    </View>
  );
};

const Technology = ({
  listHeaderText,
  listBodyContent,
}: {
  listHeaderText: string;
  listBodyContent: Array<string>;
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <View style={styles.listCom}>
      <TouchableHighlight onPress={() => setExpand(prevState => !prevState)}>
        <View style={styles.listHeader}>
          <Text>{listHeaderText}</Text>
          {expand ? (
            <Icon name={'chevron-up'} />
          ) : (
            <Icon name={'chevron-down'} />
          )}
        </View>
      </TouchableHighlight>
      {expand && (
        <View style={styles.listBody}>
          {listBodyContent.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const SelfDescription = () => {
  return (
    <ScrollView style={styles.selfDescriptionBox}>
      <Text style={styles.selfDescriptionText}>
        Confused all day long, not knowing why.
      </Text>
    </ScrollView>
  );
};

const ProfileFooter = () => {
  return <Text style={styles.footer}>&copy;http://www.sayno.work</Text>;
};

export const Profile = () => {
  const avatarImage: ImageSourcePropType = require('../../assets/avatar.jpg');
  return (
    <SafeAreaView style={styles.profilePage}>
      <Avatar imagePath={avatarImage} />
      <NameAndMotto />
      <Technology
        listHeaderText={'擅长的语言'}
        listBodyContent={['java', 'javascript', 'python', 'elisp', 'C']}
      />
      <Technology
        listHeaderText={'联系方式'}
        listBodyContent={['QQ', 'wechat', 'github']}
      />
      <Technology
        listHeaderText={'擅长的语言'}
        listBodyContent={['java', 'javascript', 'python', 'elisp', 'C']}
      />
      <SelfDescription />
      <ProfileFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarImageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'gray',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  nAndM: {
    width: '98%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    padding: 6,
    marginTop: 20,
  },
  nAndMName: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
  nAndMMotto: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
  },
  listCom: {
    marginTop: 10,
    width: '100%',
  },
  listHeader: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    fontWeight: '500',
  },
  listBody: {
    paddingLeft: 40,
  },
  selfDescriptionBox: {
    // flex: 1,
    flexDirection: 'column',
    margin: 20,
    padding: 20,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  selfDescriptionText: {
    fontWeight: '200',
    color: 'red',
  },
  footer: {
    color: 'gray',
  },
});
