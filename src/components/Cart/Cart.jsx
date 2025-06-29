import Header from "components/commons/Header";
import { MRP } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { Spinner, NoData } from "neetoui";
import { keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  // const { cartItems, setSelectedQuantity } = useCartItemsStore((state) => ({
  //   cartItems: state.cartItems,
  //   setSelectedQuantity: state.setSelectedQuantity,
  // }));
  const cartItems = useCartItemsStore((state) => state.cartItems);
  console.log("cartItems", cartItems);
  // console.log("setSelectedQuantity", setSelectedQuantity);

  const slugs = keys(cartItems);

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);
  console.log("Products", products);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, "offer_price");

  if (isLoading) return(
    <Spinner
        className="absolute top-1/2 left-1/2"
        size="large"
        strokeWidth={2}
        style="primary"
      />
    );

  if (products.length === 0) {
    return (
      <>
        <Header title="My Cart" />
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <NoData title="There are no products to show" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
