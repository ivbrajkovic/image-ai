import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { StoreApi, useStore as useZustandStore } from 'zustand';

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type ProviderProps<TInitial> = PropsWithChildren<{
  initial: TInitial;
}>;

export const createZustandContext = <
  TInitial,
  TStore extends StoreApi<unknown>,
>(
  createStore: (initial: TInitial) => TStore,
) => {
  const Context = createContext<TStore | null>(null);

  const Provider = (props: ProviderProps<TInitial>) => {
    const storeRef = useRef<TStore>();
    if (!storeRef.current) storeRef.current = createStore(props.initial);
    return (
      <Context.Provider value={storeRef.current}>
        {props.children}
      </Context.Provider>
    );
  };

  type TState = ExtractState<TStore>;

  function useStore(): TState;
  function useStore<T>(selector: (state: TState) => T): T;
  function useStore<T>(selector?: (state: TState) => T) {
    const store = useContext(Context);
    if (store === null)
      throw new Error(`useStore must be used within a Zustand store Provider`);
    return useZustandStore(store, selector!);
  }

  return { useStore, Context, Provider };
};
