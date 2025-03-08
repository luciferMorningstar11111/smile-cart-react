import { QUERY_KEYS } from "constants/query";
import productsApi from "apis/products";
import { useQuery, useQueries } from "react-query";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { Toastr } from "neetoui";
import { existsBy } from "@bigbinary/neeto-cist";

export const useShowProduct = (slug) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });

export const useFetchProducts = (params) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
    keepPreviousData: true,
  });

export const useFetchCartProducts = (slugs) => {
  const { t } = useTranslation();
  const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const responses = useQueries(
    slugs.map((slug) => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),
      onSuccess: ({ availableQuantity, name, slug, image_url }) => {
        console.log("Product data:", {
          availableQuantity,
          name,
          slug,
          image_url,
        });

        if (availableQuantity >= (cartItems[slug] || 0)) return;

        setSelectedQuantity(slug, availableQuantity);

        if (availableQuantity === 0) {
          Toastr.error(t("product.error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      },
    }))
  );

  // console.log(responses,"responses");

  const data = responses.map(prop("data")).filter(Boolean);
  const isLoading = existsBy({ isLoading: true }, responses);

  return { data, isLoading };
};
