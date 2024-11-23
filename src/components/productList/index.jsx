import { useEffect, useState } from "react";
import { NoData, Pagination } from "neetoui";
import { isEmpty ,mergeLeft} from "ramda";
import Header from "components/commons/Header";
import { Search } from "neetoicons";
import { Spinner, Input } from "neetoui";
import useQueryParams from "src/hooks/reactQuery/useQueryParams";

import ProductListItem from "components/ProductListItem";

import { useFetchProducts } from "src/hooks/reactQuery/useProductsApi";
import useCartItemsStore from "stores/useCartItemsStore";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "src/components/constants";
import routes from "routes";
import { buildUrl } from "utils/utils";
import { filterNonNull } from "neetocist";
import useFuncDebounce from "hooks/useFuncDebounce";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems ] = useState([]);
  const toggleIsInCart = useCartItemsStore((state) => state.toggleIsInCart);
  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);


  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;

  const updateQueryParams = useFuncDebounce(value => {
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
  }


  const { data: { products = [],total_products_count:totalProductsCount } = {}, isLoading } =
useFetchProducts(productsParams);
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
                }}/>
            }
          />
        </div>
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductListItem
                key={product.slug}
                {...product}
                isInCart={cartItems.includes(product.slug)}
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
  )
}

export default ProductList;
