import type Item from "~/types/item";

export default function (arr: Array<Item>, ascending?: true) {
  const sortedArr = [...arr];
  if (ascending) {
    return sortedArr.sort((a, b) => a.price.current_price - b.price.current_price);
  } else {
    return sortedArr.sort((a, b) => b.price.current_price - a.price.current_price);
  }
}