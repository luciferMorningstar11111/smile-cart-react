import axios from "axios";

const fetch = async () => {
  try {
    const response = await axios.get("https://smile-cart-backend-staging.neetodeployapp.com/countries");
    // console.log("Fetched countries:", response.data);
    return response.data; // Assuming the countries list is in `data`
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error; // Re-throw to allow the calling code to handle it
  }
};

const countriesApi = { fetch };

export default countriesApi;
