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