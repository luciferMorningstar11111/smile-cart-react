import { check } from "prettier";

const routes = {
  root: "/",
  products: {
    index: "/products",
    show: "/products/:slug",
  },
  cart: "/cart",
  checkout: "/checkout",
};

export default routes;
