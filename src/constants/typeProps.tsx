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
