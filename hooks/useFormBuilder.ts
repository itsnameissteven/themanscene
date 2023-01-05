import { useReducer, useMemo, useCallback } from 'react';
import {
  sortData,
  isChangeEvent,
  isFocusEvent,
  getInitialData,
  reducer,
  getValueById,
  getNewValues,
} from '../utils';

const useFormBuilder = <T extends IBaseValue>({
  data,
  onSubmit,
}: IOptions<T>) => {
  const [formState, formReducer] = useReducer(reducer, getInitialData(data));

  //// Handlers

  const handleChange = useCallback((e: unknown) => {
    (e as any).persist?.();
    /// Input handlers
    if (isChangeEvent<HTMLInputElement | HTMLTextAreaElement>(e)) {
      formReducer({
        type: 'INPUT',
        payload: getValueById(e),
      });
    }
  }, []);

  const handleTouch = useCallback((e: unknown) => {
    (e as any).persist?.();
    if (isFocusEvent(e)) {
      formReducer({ type: 'TOUCH', payload: e.target.id });
    }
  }, []);

  const returnNewValues = useCallback(
    () => getNewValues(formState, data),
    [formState, data]
  );

  const handleSubmit = useCallback(() => {
    if (formState.getisValid()) {
      onSubmit(returnNewValues().inputs);
      formReducer({ type: 'RESET', payload: getInitialData(data) });
    }
  }, [formState, data, onSubmit, returnNewValues]);

  const formInputs = useMemo(
    () =>
      sortData({
        data: Object.values(formState.inputs),
        sortKey: 'priority',
        sort: 'asc',
      }),
    [formState.inputs]
  );

  return {
    getValues: returnNewValues,
    handleChange,
    handleSubmit,
    handleTouch,
    formInputs,
    formState,
    formReducer,
  };
};

export default useFormBuilder;
