import { useState } from "react";

import { Delete } from "neetoicons";
import { Typography, Alert } from "neetoui";
import ProductQuantity from "src/components/commons/ProductQuantity";
import useCartItemsStore from "stores/useCartItemsStore";

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

  const [_selectedQuantity, _setSelectedQuantity] = useCartItemsStore(
    (state) => [state.cartItems[slug], state.setSelectedQuantity]
  );

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
          {shouldShowDeleteAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <Alert
                className="!w-full !max-w-[90vw] sm:!max-w-md"
                isOpen={shouldShowDeleteAlert}
                submitButtonLabel="Yes, remove"
                title="Remove item?"
                message={
                  <Typography>
                    You are removing <strong>{name}</strong> from cart. Do you
                    want to continue?
                  </Typography>
                }
                onClose={() => setShouldShowDeleteAlert(false)}
                onSubmit={() => {
                  removeCartItem(slug);
                  setShouldShowDeleteAlert(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
