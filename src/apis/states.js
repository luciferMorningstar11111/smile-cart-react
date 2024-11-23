// import axios from "axios";

// const fetch = params => axios.get("states", { params });

// const statesApi = { fetch };

// export default statesApi;
import axios from "axios";

const fetch = (params) => {
  return axios.get("https://smile-cart-backend-staging.neetodeployapp.com/states", { params }).then((res) => res.data);
};

const statesApi = { fetch };

export default statesApi;
