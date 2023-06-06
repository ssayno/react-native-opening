export const getProductDetailFunc = async (
  productId: number | undefined
) => {
  if (productId === undefined) {
    return {
      message: 'invalid product id',
    };
  }
  const headers = new Headers({
    Host: 'www.shenzhenfupin.com',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json, text/plain, */*',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
    Referer: 'https://servicewechat.com/wxc22ddcffd7cf0d4c/66/page-frame.html',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'X-Requested-With': 'XMLHttpRequest',
  });
  const basicURL = `https://www.shenzhenfupin.com/api/product/detail?productId=${productId}`;
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
