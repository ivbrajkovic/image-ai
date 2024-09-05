import React, { createContext, PropsWithChildren, useState } from 'react';
import { StoreApi, useStore as useZustandStore } from 'zustand';

export const createZustandContext = <TInitial, TState extends StoreApi<any>>(
  createStore: () => TState,
) => {
  const Context = createContext<TState | null>(null);

  const Provider = (props: PropsWithChildren) => {
    const [store] = useState(createStore);
    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  const useContext = () => {
    const contextValue = React.useContext(Context);
    if (contextValue === null)
      throw new Error(
        `useContext must be used within a Zustand store Provider`,
      );
    return contextValue;
  };

  return { useContext, Context, Provider };
};
