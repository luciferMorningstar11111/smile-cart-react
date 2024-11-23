import axios from "axios";

axios.defaults.baseURL = 'https://smile-cart-backend-staging.neetodeployapp.com';

const show = async (slug) => {
  try {
    const response = await axios.get(
      "https://smile-cart-backend-staging.neetodeployapp.com/products?page=1&page_size=50"
    );
    const productList = response.data.products;
    const product = productList.find((p) => p.slug === slug);

    return product;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const fetch = async (params) => {
  const fetchData = await axios.get(
    `https://smile-cart-backend-staging.neetodeployapp.com/products?search_term=${params.searchTerm}&page=${params.page}&page_size=${params.pageSize}`
  );

  return fetchData.data;
};

const fetchApi = async () => {
  try {
    const response = await axios.get(
      "https://smile-cart-backend-staging.neetodeployapp.com/products?search_term=shirt&page=1&page_size=10"
    );
    const datas = response.data;
    const products = datas.products;

    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const productsApi = { show, fetchApi, fetch };

export default productsApi;
