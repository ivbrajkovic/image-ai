'use client';

import { PropsWithChildren } from 'react';

import { LayersStore } from '@/components/layers-bar/layers-store';
import { createEmptyLayer } from '@/lib/create-empty-layer';
import { ImageStore } from '@/store/image-store';

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
