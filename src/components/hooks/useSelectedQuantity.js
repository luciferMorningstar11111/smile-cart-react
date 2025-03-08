// import { paths } from "ramda";
// import useCartItemsStore from "stores/useCartItemsStore";
// import { shallow } from "zustand/shallow";

// const useSelectedQuantity = (slug) => {
//   const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
//     paths([["cartItems", slug], ["setSelectedQuantity"]]),
//     shallow
//   );
//   const [cartItems] = useCartItemsStore((state) => [state.cartItems]);

//   const updateSelectedQuantity = (quantity) =>
//     setSelectedQuantity(slug, quantity);

//   return { selectedQuantity, setSelectedQuantity: updateSelectedQuantity };
// };

// export default useSelectedQuantity;
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = (slug) => {
  const [cartItems, setSelectedQuantity] = useCartItemsStore(
    (state) => [state.cartItems, state.setSelectedQuantity],
    shallow
  );

  // Ensure quantity is always a number
  const selectedQuantity = Number(cartItems[slug]) || 0;

  const updateSelectedQuantity = (quantity) => {
    setSelectedQuantity(slug, Number(quantity) || 0); // Store as number
  };

  return { selectedQuantity, setSelectedQuantity: updateSelectedQuantity };
};

export default useSelectedQuantity;
