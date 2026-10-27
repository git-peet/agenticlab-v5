import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { Button } from '@components/common/ui/Button.js';
import { toast } from '@components/common/ui/Sonner.js';
import {
  AddToCart,
  AddToCartActions,
  AddToCartState
} from '@components/frontStore/cart/AddToCart.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { ProductSingleAttributes } from '@components/frontStore/catalog/ProductSingleAttributes.js';
import { VariantSelector } from '@components/frontStore/catalog/VariantSelector.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
import { QuantitySelector } from '@components/frontStore/QuantitySelector.js';

export function ProductSingleForm() {
  const {
    price,
    sku,
    inventory: { isInStock }
  } = useProduct();
  const form = useForm();
  const [addingToCart, setAddingToCart] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  return (
    <Form id="productForm" method="POST" submitBtn={false} form={form}>
      <Area
        id="productSinglePageForm"
        coreComponents={[
          {
            component: {
              default: (
                <div className="product__single__price flex items-baseline gap-3">
                  {price.special &&
                  price.special.value < price.regular.value ? (
                    <>
                      <span className="text-2xl font-semibold">
                        {price.special.text}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {price.regular.text}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-semibold">
                      {price.regular.text}
                    </span>
                  )}
                </div>
              )
            },
            sortOrder: 5,
            id: 'price'
          },
          {
            // Re-skin (2026-07-10): spec list sits just below the price
            // (reference order), was above it at the ProductView level.
            component: {
              default: <ProductSingleAttributes />
            },
            sortOrder: 7,
            id: 'attributes'
          },
          {
            component: {
              default: <VariantSelector />
            },
            sortOrder: 10,
            id: 'variantSelector'
          },
          {
            component: {
              default: (
                <AddToCart
                  product={{
                    sku: sku,
                    isInStock: isInStock
                  }}
                  qty={quantity}
                  onSuccess={() => {
                    // To show the mini cart after adding a product to cart
                  }}
                  onError={(errorMessage) => {
                    toast.error(
                      errorMessage || _('Failed to add product to cart')
                    );
                  }}
                >
                  {(state: AddToCartState, actions: AddToCartActions) => (
                    <div className="mt-6 space-y-3">
                      {state.isInStock === true && (
                        <>
                          <QuantitySelector
                            initialValue={1}
                            min={1}
                            // Product: preserve lack of maximum unless specified
                            // (max prop omitted → defaults to Infinity, no upper bound)
                            onChange={(qty) => {
                              setQuantity(qty);
                            }}
                          />
                          <Button
                            variant={'default'}
                            size={'lg'}
                            onClick={() => {
                              form
                                .trigger()
                                .then((isValid) => {
                                  if (isValid) {
                                    setAddingToCart(true);
                                    actions.addToCart();
                                  }
                                })
                                .finally(() => {
                                  setAddingToCart(false);
                                });
                            }}
                            className="mt-2 w-full"
                            isLoading={addingToCart || state.isLoading}
                          >
                            {_('Add to cart')}
                          </Button>
                        </>
                      )}
                      {state.isInStock === false && (
                        <Button
                          onClick={() => {}}
                          className="mt-2 w-full"
                          disabled
                        >
                          {_('Sold out')}
                        </Button>
                      )}
                    </div>
                  )}
                </AddToCart>
              )
            }
          }
        ]}
      />
    </Form>
  );
}

export default ProductSingleForm;