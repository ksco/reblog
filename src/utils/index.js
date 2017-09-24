export const params = (obj) => {
  return '?' + Object.keys(obj).map(key => {
    return key + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}

export const shorten = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength-3) + '...';
}

export const rstr = () => Math.random().toString(36).substring(7);

export const queries = (paramStr) => paramStr
  .substr(1)
  .split('&')
  .map(item => ({
    key: item.split('=')[0],
    value: item.split('=')[1],
  }))
  .reduce((map, obj) => ({
    ...map,
    [obj.key]: obj.value,
  }), {});

export const toFormData = (obj) => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  });
  return formData;
}