import { useState } from "react";

export function useWishList() {
  const [wishList, setWishList] = useState([]);

  const addToWishList = (item) => {
    setWishList((prevItems) => [...prevItems, item]);
  };

  const removeFromWishList = (id) => {
    setWishList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return { wishList, addToWishList, removeFromWishList };
}
