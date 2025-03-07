import ProductQuantity from "components/commons/ProductQuantity";
import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const AddToCart = ({ slug, availableQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );

  // const { cartItems } = useCartItemsStore((state) => ({
  //   cartItems: state.cartItems,
  // }));

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
