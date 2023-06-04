import {Dimensions} from 'react-native';

type weNeedDimensionType = {
  height: number,
  width: number,
};
export const OwnDimension: weNeedDimensionType = Dimensions.get('window');
