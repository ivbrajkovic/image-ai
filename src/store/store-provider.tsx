'use client';

import { AppStore, makeStore } from '@/store/store';
import { PropsWithChildren, useRef, useState } from 'react';
import { Provider } from 'react-redux';

type StoreProviderProps = PropsWithChildren<{}>;

export const StoreProvider = (props: StoreProviderProps) => {
  const [store] = useState<AppStore>(makeStore);
  return <Provider store={store}>{props.children}</Provider>;
};
