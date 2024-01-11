/** @jsxImportSource react */

import { addItemToCart } from "../store/cart";

export const AddToCart = ({ item }: { item: ShopItem }) => {
  return (
    <button className="big-link" onClick={() => addItemToCart(item)}>
      Add to Cart
    </button>
  );
};
