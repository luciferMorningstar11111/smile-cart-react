import axios from "axios";
import { keysToCamelCase } from "neetocist";

const transformResponseKeysToCamelCase = (response) => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use((response) =>
    transformResponseKeysToCamelCase(response)
  );
};

export default responseInterceptors;
