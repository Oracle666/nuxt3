export default function (id: string, key: string) {
  const elements: string | undefined = window.localStorage[key];

  if (elements) {
    let arr: Array<string> = JSON.parse(elements);
    if (arr.find(el => el === id)) {
      arr = arr.filter(el => el !== id);
    } else {
      arr.push(id);
    }
    window.localStorage[key] = JSON.stringify(arr);
  } else {
    window.localStorage[key] = JSON.stringify([id]);
  }
}