import {
  useCartDispatch,
  useCartState
} from '@components/frontStore/cart/CartContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, {
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useRef
} from 'react';

export interface UseQuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
  cartItemId?: string;
  debounce?: number;
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
  isProduct?: boolean; // If true, treat as product add context (no cart)
}

export interface UseQuantitySelectorReturn {
  quantity: number;
  loading: boolean;
  increase: () => void;
  decrease: () => void;
  setQuantity: (quantity: number) => void;
  inputProps: {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    type: 'number';
    min?: number;
    max?: number;
    disabled: boolean;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  };
  error: string | null;
  draftQuantity: number;
  isPending: boolean;
}

export const useQuantitySelector = ({
  initialValue = 1,
  min = 1,
  max,
  onChange,
  cartItemId,
  debounce = 500,
  onSuccess,
  onFailure,
  isProduct
}: UseQuantitySelectorProps): UseQuantitySelectorReturn => {
  const [quantity, setQuantityState] = useState(initialValue);
  const [draftQuantity, setDraftQuantity] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const cartDispatch = !isProduct ? useCartDispatch() : null;
  const { loading: cartLoading } = !isProduct ? useCartState() : { loading: false };
  const previousQuantityRef = useRef(initialValue);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuantityState(initialValue);
    setDraftQuantity(initialValue);
    previousQuantityRef.current = initialValue;
    setError(null);
    setIsPending(false);
  }, [initialValue]);

  const validateDraft = useCallback((draft: number): string | null => {
    // Reject empty values
    if (draft === 0 || draft === null || draft === undefined || isNaN(draft)) {
      return _('Quantity is required');
    }
    // Reject fractional values
    if (!Number.isInteger(draft)) {
      return _('Quantity must be a whole number');
    }
    // Check minimum
    if (draft < min) {
      return _('Value must be at least ${min}', { min: min.toString() });
    }
    // Check maximum if set
    if (max !== undefined && draft > max) {
      return _('Value must be at most ${max}', { max: max.toString() });
    }
    return null;
  }, [min, max]);

  const executeCartUpdate = useCallback(
    async (targetQuantity: number) => {
      setIsPending(true);
      const currentQuantity = previousQuantityRef.current;
      const diff = targetQuantity - currentQuantity;

      if (diff === 0) {
        setIsPending(false);
        return;
      }

      const action = diff > 0 ? 'increase' : 'decrease';
      const qty = Math.abs(diff);

      if (!cartDispatch || !cartItemId) {
        // Product context (no cart): set committed quantity and notify
        setQuantityState(targetQuantity);
        previousQuantityRef.current = targetQuantity;
        if (onChange) onChange(targetQuantity);
        if (onSuccess) onSuccess();
        setError(null);
        setIsPending(false);
        return;
      }

      try {
        await cartDispatch.updateItem(cartItemId, { qty, action });
        setQuantityState(targetQuantity);
        previousQuantityRef.current = targetQuantity;
        if (onChange) onChange(targetQuantity);
        if (onSuccess) onSuccess();
        setError(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : _('Failed to update quantity');
        setError(errorMessage);
        if (onFailure) onFailure(error as Error);
        // Keep the previous committed quantity unchanged
      } finally {
        setIsPending(false);
      }
    },
    [cartDispatch, cartItemId, onChange, onSuccess, onFailure]
  );

  const handleUpdate = useCallback(
    (targetQuantity: number, immediate = false) => {
      // Validate before any UI or API operations
      const validationError = validateDraft(targetQuantity);
      setError(validationError);

      if (validationError) {
        // Show error, don't update any internal state except error
        setDraftQuantity(targetQuantity);
        return;
      }

      // Validation passed - update draft state
      setDraftQuantity(targetQuantity);
      setError(null);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // If user typed 0 but validation prevented it, don't trigger update
      if (targetQuantity === 0) {
        return;
      }

      if (immediate || debounce === 0) {
        executeCartUpdate(targetQuantity);
      } else {
        debounceTimerRef.current = setTimeout(() => {
          executeCartUpdate(targetQuantity);
        }, debounce);
      }
    },
    [min, max, validateDraft, executeCartUpdate, debounce]
  );

  const increase = useCallback(() => {
    setDraftQuantity(prev => prev + 1);
    handleUpdate(draftQuantity + 1);
  }, [draftQuantity, handleUpdate]);

  const decrease = useCallback(() => {
    setDraftQuantity(prev => prev - 1);
    handleUpdate(draftQuantity - 1);
  }, [draftQuantity, handleUpdate]);

  const setQuantity = useCallback(
    (targetQuantity: number) => {
      handleUpdate(targetQuantity);
    },
    [handleUpdate]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let draft: number;

    if (inputValue === '') {
      draft = 0;
    } else {
      draft = parseInt(inputValue, 10);
      if (isNaN(draft)) {
        // Invalid input - don't change draft quantity
        return;
      }
    }

    // Only update if there's a change from current draft
    if (draft !== draftQuantity) {
      setDraftQuantity(draft);
      // Trigger validation immediately
      const validationError = validateDraft(draft);
      setError(validationError);
    }
  };

  const handleInputBlur = () => {
    // On blur, commit the draft quantity if valid
    const validationError = validateDraft(draftQuantity);
    if (!validationError) {
      executeCartUpdate(draftQuantity);
    }
  };

  return {
    quantity,
    loading: isPending || cartLoading,
    increase,
    decrease,
    setQuantity,
    inputProps: {
      value: draftQuantity,
      onChange: handleInputChange,
      onBlur: handleInputBlur,
      type: 'number',
      min: min,
      max: max,
      disabled: isPending || cartLoading,
      'aria-invalid': error !== null,
      'aria-describedby': error ? 'quantity-error' : undefined
    },
    error,
    draftQuantity,
    isPending
  };
}

interface QuantitySelectorProps extends UseQuantitySelectorProps {
  /** Optional render function for consumers who want custom rendering in addition to built-in UI */
  children?: (props: UseQuantitySelectorReturn) => ReactNode;
  showInput?: boolean; // Show input field in addition to +/- buttons
}

export function QuantitySelector({
  children,
  showInput = true,
  min = 1,
  max,
  ...props
}: QuantitySelectorProps): ReactNode {
  const quantityControls = useQuantitySelector(props);
  const { error } = quantityControls;

  return (
    <div className="quantity-selector" data-invalid={!!error}>
      {showInput && (
        <input
          {...quantityControls.inputProps}
          className={`quantity-input ${error ? 'error' : ''}`}
          aria-label={min === 1 ? _('Quantity') : _('Quantity (minimum ${min})', { min: min.toString() })}
        />
      )}

      <div className="quantity-controls" role="group" aria-label={_('Quantity controls')}>
        <button
          onClick={quantityControls.decrease}
          disabled={quantityControls.loading || quantityControls.quantity <= 1}
          aria-label={_('Decrease quantity')}
          className="decrease-btn"
        >
          -
        </button>
        <button
          onClick={quantityControls.increase}
          disabled={quantityControls.loading}
          aria-label={_('Increase quantity')}
          className="increase-btn"
        >
          +
        </button>
      </div>

      {error && (
        <div id="quantity-error" className="quantity-error" role="alert">
          {error}
        </div>
      )}

      {children && children(quantityControls)}
    </div>
  );
}