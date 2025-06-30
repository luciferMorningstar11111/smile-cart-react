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
  const cartItems = useCartItemsStore((state) => state.cartItems);
  const slugs = keys(cartItems);

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, "offer_price");

  if (isLoading) return <Spinner />;

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
      <div className="mt-10 flex flex-col gap-10 px-4 md:flex-row md:justify-center md:gap-10">
        {/* Product list */}
        <div className="w-full space-y-5 md:w-1/3">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
          {/* PriceCard will appear below products on mobile (inside product list div),
        and on the right on desktop (moved out using md:absolute or md:flex) */}
          <div className="block md:hidden">
            {totalMrp > 0 && <PriceCard {...{ totalMrp, totalOfferPrice }} />}
          </div>
        </div>
        {/* PriceCard for desktop */}
        {totalMrp > 0 && (
          <div className="hidden md:block md:w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
