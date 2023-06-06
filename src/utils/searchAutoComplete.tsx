import {API_KEY} from '../constants/apiKey';

type completeParams = {
  searchKey: string;
};
export const searchListAutoComplete = async (params: completeParams) => {
  console.log(`Search Key is ${params.searchKey}`);
  const basicURL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.searchKey}`;
  try {
    const response = await fetch(basicURL, {method: 'GET'});
    return response.json();
  } catch (e) {
    return {
      error: `Error message is ${e}`,
    };
  }
};
