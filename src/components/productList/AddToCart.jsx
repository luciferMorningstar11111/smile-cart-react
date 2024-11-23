import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import { shallow } from "zustand/shallow";
import useCartItemsStore from "stores/useCartItemsStore";

import ProductQuantity from "components/commons/ProductQuantity";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";

const AddToCart = ({ slug , availableQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );
  const { cartItems } = useCartItemsStore((state) => ({
    cartItems: state.cartItems,
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(slug, 1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};

export default AddToCart;
