import {Image, Text, View} from 'react-native';
import {GlobalStyle} from '../../../constants/globalStyle';

type tsProps = {
  currentTime: string;
};

export const TimeShow = (props: tsProps) => {
  return (
    <View style={GlobalStyle.smallInfo}>
      <Image
        source={require('../../../../assets/icons/sun.png')}
        style={GlobalStyle.smallImage}
      />
      <Text style={GlobalStyle.smallTextStyle}>{props.currentTime}</Text>
    </View>
  );
};
