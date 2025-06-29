import { Typography } from "neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/utils";

import AddToCart from "./productList/AddToCart";

const ProductListItem = ({
  name,
  slug,
  image_url,
  offer_price,
  isInCart,
  toggleIsInCart,
  available_quantity: availableQuantity,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-40 flex-col items-center justify-between border p-4 md:w-44 lg:w-48"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40 object-contain" src={image_url} />
    <Typography className="mt-2 text-center font-semibold">{name}</Typography>
    <Typography>${offer_price}</Typography>
    <AddToCart {...{ slug, availableQuantity, isInCart, toggleIsInCart }} />
  </Link>
);

export default ProductListItem;
