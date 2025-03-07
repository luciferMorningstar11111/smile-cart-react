import axios from "axios";

const create = (payload) =>
  axios.post(
    "https://smile-cart-backend-staging.neetodeployapp.com/orders",
    payload
  );

const ordersApi = { create };

export default ordersApi;
