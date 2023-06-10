import {Image, Text, View} from 'react-native';
import {GlobalStyle} from '../../../constants/globalStyle';

type dwProps = {
  dropWater: number;
};

export const DropWater = (props: dwProps) => {
  return (
    <View style={GlobalStyle.smallInfo}>
      <Image
        source={require('../../../../assets/icons/drop.png')}
        style={GlobalStyle.smallImage}
      />
      <Text style={GlobalStyle.smallTextStyle}>{props.dropWater} %</Text>
    </View>
  );
};
