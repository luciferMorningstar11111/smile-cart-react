import Header from "components/commons/Header";
import AddToCart from "components/productList/AddToCart";
import { Typography, Spinner, Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useSelectedQuantity from "src/components/hooks/useSelectedQuantity";
import { useShowProduct } from "src/hooks/reactQuery/useProductsApi";
import routes from "src/routes";

import Carousel from "./Carousel";

import PageNotFound from "../commons/PageNotFound";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const {
    name,
    mrp,
    offer_price,
    image_urls,
    available_quantity: availableQuantity,
    image_url,
  } = product;
  console.log("product", product);
  const totalDiscounts = mrp - offer_price;

  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  // return in case of invalid slug
  if (isError) {
    return <PageNotFound />;
  }

  //while the api is getting the data
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Header title="Smile Cart" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <Carousel
            imageUrls={append(image_url, image_urls)}
            title="Infinix Inbook"
          />
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{name}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offer_price}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
