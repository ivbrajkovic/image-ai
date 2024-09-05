'use client';

import { makeStore } from '@/store/store';
import { PropsWithChildren, useState } from 'react';
import { Provider } from 'react-redux';

type StoreProviderProps = PropsWithChildren<{}>;

export const StoreProvider = (props: StoreProviderProps) => {
  const [{ store, persistor }] = useState(makeStore);
  return <Provider store={store}>{props.children}</Provider>;
};
