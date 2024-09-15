'use client';

import { PropsWithChildren } from 'react';

import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';
import { createEmptyLayer } from '@/store/utils/create-empty-layer';

export const StoreProvider = (props: PropsWithChildren) => {
  return (
    <ImageStore.Provider initial={{ generating: false }}>
      <LayersStore.Provider
        initial={{
          layerComparisonMode: false,
          layers: [createEmptyLayer()],
        }}
      >
        {props.children}
      </LayersStore.Provider>
    </ImageStore.Provider>
  );
};
