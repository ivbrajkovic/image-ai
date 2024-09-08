'use client';

import { PropsWithChildren } from 'react';

import { ImageStore } from '@/features/editor/store/image-store';
import { LayersStore } from '@/features/editor/store/layers-store';
import { createEmptyLayer } from '@/lib/create-empty-layer';

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
