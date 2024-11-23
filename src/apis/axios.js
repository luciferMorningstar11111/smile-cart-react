import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";
import { t } from "i18next";
import { Toastr } from "neetoui";

const requestInterceptors = () => {
  axios.interceptors.request.use((request) =>
    evolve(
      { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
      request
    )
  );
};

const transformResponseKeysToCamelCase = (response) => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use((response) =>
    transformResponseKeysToCamelCase(response)
  );
};

export default function initializeAxios() {
  // ...
  requestInterceptors();
}

// ..

// ..

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

// ..
