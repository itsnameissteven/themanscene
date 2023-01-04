import { useReducer, useMemo, useCallback, useRef } from 'react';
import { sortData, isChangeEvent, isFocusEvent } from '../utils';

///// Types

type IBaseValue = {
  type: 'input' | 'select' | 'textarea' | 'submit'; // etc
  value: string;
  id: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  label?: string;
};
interface IOptions<T extends IBaseValue> {
  data: T[];
  onSubmit: (data: FormInputDef) => void;
}

declare global {
  type FormInputDef<T extends {} = {}> = (IBaseValue & T)[];
}

type FormState = ReturnType<typeof getInitialData>;

type FormAction =
  | { type: 'INPUT'; payload: { id: string; value: string } }
  | { type: 'TOUCH'; payload: string }
  | { type: 'RESET'; payload: FormState };

type FormInputs = FormState['inputs'];

type CleanedInput<T extends IBaseValue> = T & {
  priority: number;
  getIsError: () => boolean;
  isTouched: boolean;
  displayError: () => boolean;
};

interface IGetNewInputsArgs {
  inputs: FormInputs;
  key: string;
  value: string;
}

type TouchArgs = Omit<IGetNewInputsArgs, 'value'>;

/////////////////////////////////
/// Format initial Data
/////////////////////////////////

const getInitialData = <T extends IBaseValue>(options: IOptions<T>) => {
  const cleanedData = options.data.reduce(
    (
      acc: {
        [key: string]: CleanedInput<T>;
      },
      el,
      i
    ) => {
      const { id } = el;
      acc[id] = {
        ...el,
        priority: i,
        isTouched: false,
        getIsError: function () {
          return !!this.required && !this.value.trim().length;
        },
        displayError: function () {
          return this.getIsError() && this.isTouched;
        },
      };
      return acc;
    },
    {}
  );
  return {
    inputs: cleanedData,
    getisValid: function () {
      return !Object.values(this.inputs).some((input) => input.getIsError());
    },
  };
};

const getNewInputs = ({
  inputs,
  key,
  value,
}: IGetNewInputsArgs): FormInputs => {
  return {
    ...inputs,
    [key]: {
      ...inputs[key],
      value,
    },
  };
};
const touch = ({ inputs, key }: TouchArgs): FormInputs => {
  return {
    ...inputs,
    [key]: {
      ...inputs[key],
      isTouched: true,
    },
  };
};

const reducer = (state: FormState, action: FormAction) => {
  const { type } = action;
  if (type === 'INPUT') {
    const newInputs = getNewInputs({
      inputs: state.inputs,
      key: action.payload.id,
      value: action.payload.value,
    });
    return {
      ...state,
      inputs: newInputs,
    };
  }
  if (type === 'TOUCH') {
    return {
      ...state,
      inputs: touch({ inputs: state.inputs, key: action.payload }),
    };
  }
  if (type === 'RESET') {
    return action.payload;
  }
  return state;
};

const getNewValues = <T extends IBaseValue>(
  formState: FormState,
  inputs: T[]
) => {
  // use data map and replace with new values, remove any added valus for
  const newValues = inputs.map((el) => {
    const { inputs } = formState;

    if (inputs?.[el.id]) {
      const { priority, getIsError, ...rest } = inputs[el.id];
      return { ...el, ...rest };
    }
    return el;
  });

  return {
    inputs: newValues,
  };
};

const getValueById = <T extends Handler>(e: T) => {
  return {
    id: e.target.id,
    value: e.target.value,
  };
};

const useFormBuilder = <T extends IBaseValue>(options: IOptions<T>) => {
  const [formState, formReducer] = useReducer(reducer, getInitialData(options));

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

  const handleSubmit = useCallback(() => {
    if (formState.getisValid()) {
      options.onSubmit(getNewValues(formState, options.data).inputs);
      formReducer({ type: 'RESET', payload: getInitialData(options) });
    }
  }, [formState, options]);

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
    getValues: () => getNewValues(formState, options.data),
    handleChange,
    handleSubmit,
    handleTouch,
    formInputs,
    formState,
    formReducer,
  };
};

export default useFormBuilder;
