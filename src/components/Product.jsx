import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Typography } from "neetoui";

import Carousel from "./Carousel";
import { IMAGE_URLS } from "./constants";


// import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState({});

  //fetch  product function
  const fetchProduct = async () => {
    try {
      const productData = await productsApi.show();
      setProduct(productData);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // const { name, description, mrp, offer_price } = product;

  const totalDiscounts = mrp - offer_price;

  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        {/* <p className="py-2 text-4xl font-semibold">Infinix INBOOK</p> */}
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <Carousel imageUrls={IMAGE_URLS} title="Infinix Inbook" />
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offer_price}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          {/* <p>
            Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year
            Warranty.
          </p>
          <p>MRP: $395.97</p> */}
          {/* <p className="font-semibold">Offer price: $374.43</p>
          <p className="font-semibold text-green-600">6% off</p> */}
        </div>
      </div>
      <h1>hello</h1>
    </div>
  );
};

export default Product;
