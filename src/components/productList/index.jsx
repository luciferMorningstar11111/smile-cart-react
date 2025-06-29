import { useState } from "react";

import Header from "components/commons/Header";
import ProductListItem from "components/ProductListItem";
import useFuncDebounce from "hooks/useFuncDebounce";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { NoData, Pagination, Spinner, Input } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "src/components/constants";
import { useFetchProducts } from "src/hooks/reactQuery/useProductsApi";
import useQueryParams from "src/hooks/reactQuery/useQueryParams";
import useCartItemsStore from "src/stores/useCartItemsStore";
import { buildUrl } from "utils/utils";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const cartItems = useCartItemsStore((state) => state.cartItems);

  console.log("cartItems", cartItems);
  const toggleIsInCart = useCartItemsStore((state) => state.toggleIsInCart);
  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;

  const updateQueryParams = useFuncDebounce((value) => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    setSearchKey(value);
    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const history = useHistory();

  const handlePageNavigation = (page) => {
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );
  };

  const {
    data: { products = [], total_products_count: totalProductsCount } = {},
    isLoading,
  } = useFetchProducts(productsParams);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col">
        <div className="m-2">
          <Header
            cartItemsCount={cartItems.length}
            shouldShowBackButton={false}
            title="Smile Cart"
            actionBlock={
              <Input
                placeholder="Search products"
                prefix={<Search />}
                type="search"
                value={searchKey}
                onChange={({ target: { value } }) => {
                  updateQueryParams(value);
                  setSearchKey(value);
                }}
              />
            }
          />
        </div>
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          <div className="grid grid-cols-2  justify-items-center gap-y-8 p-4 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
              <ProductListItem
                key={product.slug}
                {...product}
                // isInCart={cartItems.includes(product.slug)}
                isInCart={Object.keys(cartItems).includes(product.slug)}
                toggleIsInCart={() => toggleIsInCart(product.slug)}
              />
            ))}
          </div>
        )}
        <div className="mb-5 self-end">
          <Pagination
            count={totalProductsCount}
            navigate={handlePageNavigation}
            pageNo={Number(page) || DEFAULT_PAGE_INDEX}
            pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
