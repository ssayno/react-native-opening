import {API_KEY} from '../constants/apiKey';

type completeParams = {
  regionAndCountry: string;
  days: number;
};
export const getWeatherForeCast = async (params: completeParams) => {
  console.log(`Search Key is ${params.regionAndCountry}`);
  const basicURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.regionAndCountry}&days=${params.days}&aqi=no&alerts=n`;
  try {
    const response = await fetch(basicURL, {method: 'GET'});
    return response.json();
  } catch (e) {
    return {
      error: `Error message is ${e}`,
    };
  }
};
