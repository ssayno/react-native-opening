import {StackNavigationProp} from '@react-navigation/stack';

export type completeParams = {
  regionAndCountry: string;
  days: number;
};
export type singleDailyProps = {
  date_: string;
  temperature: string;
  condition: string;
};
export type searchBoxProps = {
  handleFunc: (params: completeParams) => void;
};
export type weatherProps = {
  regionAndCountry: string;
  temperature: number;
  weatherName: string;
  distance: number;
  dropWater: number;
  timeNow: string;
  forecast: singleDailyProps[];
} | null;

export type singleSearchResultProps = {
  name: string;
  country: string;
};

export type singleMoveLeftProps = {
  sideBarName: string;
};
export type singleMoveRightProps = {
  name: string;
  filePath: string;
  id: number;
};
export type singleMovieSideProp = {
  correspondingData: singleMoveRightProps[];
} & singleMoveLeftProps;
export type movieSideProp = {
  allData: Array<singleMovieSideProp> | null;
  currentIndex: number;
};

export type getSingleCategoryFuncProp = {
  itemId: number;
  page: number;
};

export type singleProductProps = {
  mainImg: string;
  productName: string;
  adviceRetailPrice: string;
  productPrice: string;
  productId: number;
  num: number;
};
export type productListProps = {
  listData: Array<singleProductProps>;
  page: number;
  total: number;
};
export type productCardProps = singleProductProps & {
  navigation: StackNavigationProp<any>;
  index: number;
  openShoppingCarModal: (x: number) => void;
};

export type shoppingCarModalDataProp = {
  show: boolean;
  showContent: singleProductProps | null;
};

// export type debounceProps = {
//   value: T;
//   delay: number;
// };
//
// export type debounceFuncProps = {
//   (x: debounceProps) => T;
// }
