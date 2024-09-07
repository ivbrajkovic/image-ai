'use client';

import { UploadImage } from '@/features/editor/component/UploadImage';
import { ImageStore } from '@/features/editor/store/imageStore';
import { LayerStore } from '@/features/editor/store/layerStore';

export const Editor = () => {
  return (
    <ImageStore.Provider initial={{ generating: false }}>
      <LayerStore.Provider
        initial={{
          layerComparisonMode: false,
          layers: [
            {
              id: crypto.randomUUID(),
              publicId: '',
              url: '',
              width: 0,
              height: 0,
            },
          ],
        }}
      >
        <UploadImage />
      </LayerStore.Provider>
    </ImageStore.Provider>
  );
};
