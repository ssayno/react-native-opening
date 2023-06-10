import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {ProfileStackParamList} from '../navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

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

type ProfileNavProps = {
  navigation: StackNavigationProp<ProfileStackParamList>;
  listHeaderText: string;
};

const LanguageIntroNav = ({navigation, listHeaderText}: ProfileNavProps) => {
  return (
    <View style={styles.listCom}>
      <View style={styles.listHeader}>
        <Text>{listHeaderText}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileLanguageIntro');
          }}>
          <Text>go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ContactDetailsNav = ({navigation, listHeaderText}: ProfileNavProps) => {
  return (
    <View style={styles.listCom}>
      <View style={styles.listHeader}>
        <Text>{listHeaderText}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileContactDetails');
          }}>
          <Text>go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HobbiesNav = ({navigation, listHeaderText}: ProfileNavProps) => {
  return (
    <View style={styles.listCom}>
      <View style={styles.listHeader}>
        <Text>{listHeaderText}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileHobbies');
          }}>
          <Text>go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const SelfDescription = () => {
//   return (
//     <View style={styles.selfDescriptionBox}>
//       <Text style={styles.selfDescriptionText}>
//         Confused all day long, not knowing why.
//       </Text>
//     </View>
//   );
// };

const ProfileFooter = () => {
  return <Text style={styles.footer}>&copy;</Text>;
};

type ProfileMainScreenProps = {
  route: RouteProp<ProfileStackParamList, 'ProfileMain'>;
  navigation: StackNavigationProp<ProfileStackParamList, 'ProfileMain'>;
};

export const Profile = ({navigation}: ProfileMainScreenProps) => {
  const avatarImage: ImageSourcePropType = require('../../assets/avatar.jpg');
  return (
    <SafeAreaView style={styles.profilePage}>
      <Avatar imagePath={avatarImage} />
      <NameAndMotto />
      <LanguageIntroNav navigation={navigation} listHeaderText={'擅长的语言'} />
      <ContactDetailsNav navigation={navigation} listHeaderText={'联系方式'} />
      <HobbiesNav navigation={navigation} listHeaderText={'兴趣爱好'} />
      {/*<SelfDescription />*/}
      <ProfileFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    width: '90%',
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
    width: '90%',
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
    flex: 1,
    flexDirection: 'column',
    margin: 20,
    padding: 20,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  selfDescriptionText: {
    fontWeight: '800',
    color: 'red',
  },
  footer: {
    color: 'gray',
    marginTop: 'auto',
  },
});
