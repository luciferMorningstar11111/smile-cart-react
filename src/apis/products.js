import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const show = async (slug) => {
  try {
    const response = await axios.get("/products?page=1&page_size=50");
    const productList = response.data.products;

    return productList.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching products:", error);

    return null; // Ensure function always returns a value
  }
};

const fetch = async (params) => {
  try {
    const response = await axios.get(
      `/products?search_term=${params.searchTerm}&page=${params.page}&page_size=${params.pageSize}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
};

const fetchApi = async () => {
  try {
    const response = await axios.get(
      "/products?search_term=shirt&page=1&page_size=10"
    );

    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
};

const productsApi = { show, fetchApi, fetch };

export default productsApi;
