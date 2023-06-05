import { getSingleCategoryFuncProp } from "../constants/typeProps";

export const getSingleCategoryFunc = async (prop: getSingleCategoryFuncProp) => {
  if (prop === undefined) {
    return {
      message: 'invalid product id',
    };
  }
  const headers = new Headers({
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
    Cookie: 'jcloud_alb_route=000a8be438b560575f4102cf63925eee',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json, text/plain, */*',
    Referer: 'https://servicewechat.com/wxc22ddcffd7cf0d4c/65/page-frame.html',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'X-Requested-With': 'XMLHttpRequest',
  });
  const basicURL = `https://www.shenzhenfupin.com/api/product/selectviewproductpage?offset=${
    20 * prop.page
  }&limit=20&productName=&hotProduct=&isPromotion=&isNew=&isReleaseCMall=1&managementName=&platformClassIdStr=%5B%22${
    prop.itemId
  }%22%5D&isSalesSort=1`;
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
