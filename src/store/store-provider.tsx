'use client';

import { PropsWithChildren } from 'react';

import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const StoreProvider = (props: PropsWithChildren) => {
  return (
    <ImageStore.Provider initial={{ generating: false }}>
      <LayersStore.Provider initial={{ layerComparisonMode: false }}>
        {props.children}
      </LayersStore.Provider>
    </ImageStore.Provider>
  );
};
