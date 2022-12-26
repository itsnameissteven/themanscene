import { ChangeEvent, useReducer } from 'react';
import { objMap, sortData } from '../utils';

function isChangeEvent<T>(e: unknown): e is ChangeEvent<T> {
  return (e as ChangeEvent).type === 'change';
}

interface IBaseValue {
  type: 'input' | 'select' | 'textarea'; // etc
  value: string;
  id: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  label?: string;
  ruleId?: string | string[];
  ruleValue?: string[];
  conditionalValues?: 'equals' | 'is' | 'isNot' | 'includes';
}

interface IOptions<T extends IBaseValue> {
  data: T[];
}

// const handleChange = () => {
//   return (e: unknown) => {
//     console.log(e);
//     return {
//       id,
//     };
//   };
// };

const getInitialData = <T extends IBaseValue>(initialData: T[]) => {
  // address return type
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

const useFormBuilder = <T extends IBaseValue>(options: IOptions<T>) => {
  const [formState, formReducer] = useReducer(
    reducer,
    getInitialData(options.data)
  );

  const formInputs = sortData({
    data: Object.values(formState.inputs),
    sortKey: 'priority',
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
        };
      },
    };
  });

  return {
    formInputs,
    formState,
    formReducer,
  };
};

export default useFormBuilder;
