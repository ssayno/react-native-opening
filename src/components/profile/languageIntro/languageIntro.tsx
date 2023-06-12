import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, memo} from 'react';

type languageBoxProps = {
  title: string;
  details: string;
  project: string;
};

const LanguageBox = ({title, details, project}: languageBoxProps) => {
  return (
    <View style={styles.singleLanguageBox}>
      <View style={[styles.languageBoxName]}>
        <Text style={styles.languageName}>{title}</Text>
      </View>
      <View style={styles.languageBoxNormal}>
        <Text style={styles.titleStyle}>Details:</Text>
        <Text style={styles.contentStyle}>{details}</Text>
      </View>
      <View style={styles.languageBoxNormal}>
        <Text style={styles.titleStyle}>Projects or Scripts</Text>
        <Text style={styles.contentStyle}>{project}</Text>
      </View>
    </View>
  );
};

const LanguageIntro = () => {
  useEffect(() => {
    console.log('language page refresh');
  }, []);
  const tempData: Array<languageBoxProps> = [
    {
      title: 'python',
      details:
        '熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫',
      project: 'youtube',
    },
    {
      title: 'JavaScript',
      details:
        '熟练使用 React熟练使用 React熟练使用 React熟练使用 React熟练使用 React',
      project: 'Personal blog',
    },
    {
      title: 'C, Java',
      details:
        '熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫熟练的使用爬虫',
      project: 'APUE, UNS',
    },
  ];
  return (
    <FlatList
      style={{flex: 1}}
      data={tempData}
      renderItem={({item, index}) => {
        return <LanguageBox {...item} key={index} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  singleLanguageBox: {
    position: 'relative',
    borderWidth: 2,
    borderColor: 'skyblue',
    borderRadius: 6,
    borderStyle: 'solid',
    padding: 10,
    margin: 20,
    flexDirection: 'column',
    rowGap: 10,
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'deepskyblue',
    borderStyle: 'solid',
  },
  languageBoxName: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
  },
  languageName: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 2,
    paddingTop: 2,
    color: 'gray',
  },
  languageBoxNormal: {
    rowGap: 10,
  },
  titleStyle: {
    fontWeight: '700',
    fontSize: 16,
  },
  contentStyle: {
    fontSize: 12,
    paddingLeft: 6,
  },
});

export default memo(LanguageIntro);
