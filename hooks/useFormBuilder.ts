import { useReducer } from 'react';
import { objMap, sortData, isChangeEvent } from '../utils';

// function isChangeEvent<T>(e: unknown): e is ChangeEvent<T> {
//   return (e as ChangeEvent).type === 'change';
// }

type IBaseValue = {
  type: 'input' | 'select' | 'textarea' | 'submit'; // etc
  value: string;
  id: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  label?: string;
  ruleId?: string | string[];
  ruleValue?: string[];
  conditionalValues?: 'equals' | 'is' | 'isNot' | 'includes';
};

declare global {
  type FormInputDef<T extends {} = {}> = (IBaseValue & T)[];
}

interface IOptions<T extends IBaseValue> {
  data: T[];
}

const getInitialData = <T extends IBaseValue>(initialData: T[]) => {
  const cleanedData = initialData.reduce(
    (
      acc: {
        [key: string]: T & {
          priority: number;
        };
      },
      el,
      i
    ) => {
      const { id } = el;
      acc[id] = {
        ...el,
        priority: i,
      };
      return acc;
    },
    {}
  );
  return {
    inputs: cleanedData,
    isValid: false,
  };
};

type FormState = ReturnType<typeof getInitialData>;

type FormAction = { type: 'INPUT'; payload: { id: string; value: string } };

const reducer = (state: FormState, action: FormAction) => {
  const { type } = action;
  if (type === 'INPUT') {
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.payload.id]: {
          ...state.inputs[action.payload.id],
          value: action.payload.value,
        },
      },
    };
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
      const { priority, ...rest } = inputs[el.id];
      return { ...el, ...rest };
    }
    return el;
  });

  return {
    inputs: newValues,
    isValid: formState.isValid,
  };
};

const useFormBuilder = <T extends IBaseValue>(options: IOptions<T>) => {
  const [formState, formReducer] = useReducer(
    reducer,
    getInitialData(options.data)
  );

  const formInputs = sortData({
    data: Object.values(formState.inputs),
    sortKey: 'priority',
    sort: 'asc',
  }).map((el) => {
    return {
      ...el,
      handleChange: () => {
        return (e: unknown) => {
          (e as any).persist?.();
          if (el.type === 'input' && isChangeEvent<HTMLInputElement>(e)) {
            formReducer({
              type: 'INPUT',
              payload: { id: el.id, value: e.target.value },
            });
          }
          if (el.type === 'textarea' && isChangeEvent<HTMLTextAreaElement>(e)) {
            formReducer({
              type: 'INPUT',
              payload: { id: el.id, value: e.target.value },
            });
          }
        };
      },
    };
  });

  const getValues = () => {
    // use data map and replace with new values, remove any added valus for
    return getNewValues(formState, options.data);
  };

  return {
    getValues,
    formInputs,
    formState,
    formReducer,
  };
};

export default useFormBuilder;
