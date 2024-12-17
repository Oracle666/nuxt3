export default function(key: string, value: string, isArray?: true) {
  if (window.localStorage[key]) {
    if (isArray) {
      return !!JSON.parse(window.localStorage[key]).find((el: string) => el === value);
    } else {
      return window.localStorage[key] === value;
    }
  } else {
    return false;
  }
} 