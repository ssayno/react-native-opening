export const getProductCategories = async () => {
  // console.log(`Search Key is ${params.regionAndCountry}`);
  const basicURL =
    'https://www.shenzhenfupin.com/api/productclass/indexproductclass';
  const headers = new Headers({
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
    'Cookie': 'jcloud_alb_route=135521239454c605aff7304a50f23d87',
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  try {
    const response = await fetch(basicURL, {
      method: 'GET',
      headers: headers,
    });
    return response.json();
  } catch (e) {
    return {
      error: `Error message is ${e}`,
    };
  }
};
