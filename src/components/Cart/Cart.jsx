import { useEffect, useState } from "react";

import productsApi from "apis/products";
import Header from "components/commons/Header";
import { MRP } from "components/constants";
import { Toastr, Spinner } from "neetoui";
import { keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import ProductCard from "./ProductCard";
import { cartTotalOf } from "components/utils";
import PriceCard from "./PriceCard";
import i18n from "i18next";
import withTitle from "utils/withTitle";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { NoData } from "neetoui";

const Cart = () => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore((state) => ({
    cartItems: state.cartItems,
    setSelectedQuantity: state.setSelectedQuantity,
  }));

  const slugs = keys(cartItems);
  const { data: products = [], isLoading } = useFetchCartProducts(slugs);


  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, "offer_price");
console.log(products,"CartProducts");

  if (isLoading) return <Spinner />;

  if (products.length === 0)
    return (
   <>
      <Header title="My Cart" />
    <div className="flex justify-center items-center h-full">
      <div className="flex w-full items-center justify-center">
        <NoData
          title="There are no products to show"
        />
      </div>
    </div>
   </>
  );

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
