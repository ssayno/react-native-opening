import { Image, StyleSheet, Text, View } from "react-native";
type locationProps = {
  rAndC: string
};

export const LocationShow = (props: locationProps) => {
  const [province, country] = props.rAndC.split(',');
  return (
    <View style={styles.locationStyle}>
      <Text style={styles.lineStyle}>
        {country && (
          <>
            <Text style={styles.provinceStyle}>{province}</Text>&nbsp;&nbsp;&nbsp;
            <Text style={styles.countryStyle}>{country}</Text>
          </>
        )}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  locationStyle: {
    marginTop: 30,
    alignItems: 'center',
  },
  lineStyle: {
    textAlign: 'center',
  },
  provinceStyle: {
    fontSize: 22,
    fontWeight: '600',
  },
  countryStyle: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 24,
  },
});
