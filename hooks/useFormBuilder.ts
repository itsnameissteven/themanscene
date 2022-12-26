import { useReducer } from 'react';

interface IBaseValue {
  type: 'input' | 'select' | 'text-area'; // etc
  value: string;
  id: string;
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

const getInitialData = <T extends IBaseValue>(initialData: T[]) => {
  const cleanedData = initialData.reduce((acc: { [key: string]: T }, el) => {
    const { id } = el;
    const handleChange = () => {
      return (e: unknown) => {
        console.log(e);
        return {
          id,
        };
      };
    };
    acc[id] = {
      ...el,
      handleChange,
    };
    return acc;
  }, {});
  return {
    inputs: {
      0: {
        cleanedData,
      },
    },
    isValid: false,
  };
};

const reducer = (state: any, action: any) => {
  return state;
};

const useFormBuilder = <T extends IBaseValue>(options: IOptions<T>) => {
  const [formState, formReducer] = useReducer(
    reducer,
    getInitialData(options.data)
  );
};

export default useFormBuilder;
