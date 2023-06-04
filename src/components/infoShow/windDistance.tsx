import {Image, Text, View} from 'react-native';
import {GlobalStyle} from '../../constants/globalStyle';
type wdProps = {
  distance: number;
};
export const WindDistance = (props: wdProps) => {
  return (
    <View style={GlobalStyle.smallInfo}>
      <Image
        source={require('../../../assets/icons/wind.png')}
        style={GlobalStyle.smallImage}
      />
      <Text style={GlobalStyle.smallTextStyle}>{props.distance} Km</Text>
    </View>
  );
};
