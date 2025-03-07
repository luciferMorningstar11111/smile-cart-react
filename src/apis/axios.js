import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

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

const shouldShowToastr = (response) =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = (response) => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);
};

const showErrorToastr = (error) => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    (error) => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

export default function initializeAxios() {
  requestInterceptors();
  responseInterceptors();
}
