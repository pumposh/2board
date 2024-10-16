import { type UnwrapNestedRefs, reactive } from 'vue';

type Setters<T> = {
  [K in keyof T]: (value: T[K]) => void;
} & {
  value: (val: T) => void;
}

type AutoState<T> = {
  value: UnwrapNestedRefs<T>;
  set: Setters<T>;
}

/**
 * autoState creates an object with a reactive value and setters for each key in the initialState.
 * The setters are auto-generated and will update the reactive value when called.
 * 
 * This is useful for a Store's state for easy access and mutation.
 */
export const autoState = <T extends object>(initialState: T): AutoState<T> => {
  const initialValue = reactive(initialState);

  const state: AutoState<T> = {
    value: initialValue,
    set: {
      ...Object.keys(initialState).reduce((acc, _key) => {
        const key = _key as keyof T;
        acc[key] = ((value: T[keyof T]) => {
          if (typeof key === 'symbol') return;
          (state.value as any)[key] = value;
        }) as Setters<T>[keyof T];
        return acc;
      }, {} as Setters<T>),
      value: (val: T) => {
        Object.assign(state.value, val);
      },
    },
  };

  return state;
};
