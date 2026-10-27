import { Area } from '@components/common/Area.js';
import { toast } from '@components/common/ui/Sonner.js';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { useCatalogImageDimensions } from '@components/common/useCatalogImageDimensions.js';
import { CartItem } from '@components/frontStore/cart/CartContext.js';
import { QuantitySelector } from '@components/frontStore/QuantitySelector.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { deriveProductImageSize } from '@evershop/evershop/lib/util/deriveProductImageSize';
import { Minus, Trash2 } from 'lucide-react';
import React from 'react';

interface CartItemsTableProps {
  items: CartItem[];
  showPriceIncludingTax?: boolean;
  loading?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  currentSort?: { key: string; direction: 'asc' | 'desc' };
  onRemoveItem?: (itemId: string) => Promise<void>;
}

/**
 * Re-skin (2026-07-10): a flex line-item list matching the reference — 96px
 * bordered thumbnail, then a content block with name/SKU/variant + line total
 * on the top row and the qty stepper + Remove on the bottom row, items divided
 * by rules. (Was a 3-column ExtendableTable.)
 */
export const DefaultCartItemList: React.FC<CartItemsTableProps> = ({
  items,
  showPriceIncludingTax = true,
  loading = false,
  onRemoveItem
}) => {
  // Fixed 96px square display (h-24 w-24 + object-cover); base 200 keeps it sharp on retina.
  const thumbSize = deriveProductImageSize(200, useCatalogImageDimensions());
  return (
    <>
      <Area id="cartItemListBefore" noOuter />
      <div className="cart__items divide-y divide-border">
        {items.map((row) => {
          const totalValue = showPriceIncludingTax
            ? row.lineTotalInclTax?.text
            : row.lineTotal?.text;
          return (
            <div key={row.cartItemId} className="cart__item flex gap-4 py-5">
              <div className="shrink-0">
                {row.thumbnail ? (
                  <Image
                    src={row.thumbnail}
                    alt={row.productName}
                    width={thumbSize.width}
                    height={thumbSize.height}
                    sizes="100px"
                    objectFit="cover"
                    className="h-24 w-24 rounded-lg border border-border"
                  />
                ) : (
                  <ProductNoThumbnail width={96} height={96} />
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <a
                      href={row.productUrl}
                      className="font-medium hover:underline"
                    >
                      {row.productName}
                    </a>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {_('SKU ${sku}', { sku: row.productSku })}
                    </div>
                    {row.variantOptions?.map((option) => (
                      <div
                        key={option.optionId}
                        className="mt-0.5 text-xs text-muted-foreground"
                      >
                        {option.attributeName}: {option.optionText}
                      </div>
                    ))}
                    {row.errors?.map((error, index) => (
                      <div key={index} className="mt-0.5 text-xs text-destructive">
                        {error}
                      </div>
                    ))}
                  </div>
                  <div className="text-right font-medium tabular-nums">
                    {totalValue}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantitySelector
                    initialValue={row.qty}
                    cartItemId={row.cartItemId}
                    min={1}
                    max={99}
                    onSuccess={() => {
                      // Cart sync handled by CartContext after successful update
                    }}
                    onFailure={(error) => {
                      // Surface error to user via toast
                      toast.error(error.message || _('Failed to update quantity'));
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemoveItem?.(row.cartItemId);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {_('Remove')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Area id="cartItemListAfter" noOuter />
    </>
  );
};
