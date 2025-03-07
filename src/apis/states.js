import axios from "axios";

const fetch = async (params) => {
  try {
    const response = await axios.get(
      "https://smile-cart-backend-staging.neetodeployapp.com/states",
      { params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

const statesApi = { fetch };

export default statesApi;
