const parseParams = (params = '') => {
  if (params === '') {
    return '';
  }
  const rawParams = params.replace('?', '').split('&');
  const extractedParams: any = {};
  rawParams.forEach((item: any) => {
    item = item.split('=');
    extractedParams[item[0]] = item[1];
  });
  return extractedParams;
};

export default parseParams;
