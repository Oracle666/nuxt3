export default interface Item {
  code: string | null,
  id: string,
  image: {
    url: string
  },
  material: number,
  name: string,
  price: {
    current_price: number,
    old_price: number
  },
  addedToCart?: boolean,
  addedToFavorite?: boolean
};