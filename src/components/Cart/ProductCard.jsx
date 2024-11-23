import ProductQuantity from "components/commons/ProductQuantity";
import { Typography } from "neetoui";
import { Delete } from "neetoicons";
import { prop } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { useState } from "react";
import { Alert } from "neetoui";

const ProductCard = ({
  slug,
  image_url: imageUrl,
  offer_price: offerPrice,
  mrp,
  name,
  available_quantity: availableQuantity,
}) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const removeCartItem = useCartItemsStore.pickFrom();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <ProductQuantity {...{ availableQuantity, slug }} />
        <div className="flex items-center space-x-2">
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel="Yes, remove"
            title="Remove item?"
            message={
              <Typography>
                You are removing <strong>{name}</strong> from cart. Do you want
                to continue?
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  )
};

export default ProductCard;