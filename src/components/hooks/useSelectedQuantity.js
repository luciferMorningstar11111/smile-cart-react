import { paths } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = (slug) => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );
  const [cartItems] = useCartItemsStore((state) => [state.cartItems]);
  console.log(selectedQuantity, "selectedQuantity");
  console.log(cartItems, "cartItems");

  const updateSelectedQuantity = (quantity) =>
    setSelectedQuantity(slug, quantity);

  return { selectedQuantity, setSelectedQuantity: updateSelectedQuantity };
};

export default useSelectedQuantity;
