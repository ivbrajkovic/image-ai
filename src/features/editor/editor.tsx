'use client';

import { Button } from '@/components/ui/button';
import { UploadImage } from '@/features/editor/component/UploadImage';
import { ImageStore } from '@/features/editor/store/imageStore';
import { LayerStore } from '@/features/editor/store/layerStore';

const TestButton = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const setGenerating = ImageStore.useStore((state) => state.setGenerating);

  const handleClick = () => {
    setGenerating(!generating);
  };

  return (
    <div>
      <h1>{generating ? 'generating' : 'not generating'}</h1>
      <Button onClick={handleClick}>Set Generating</Button>
    </div>
  );
};

export const Editor = () => {
  return (
    <LayerStore.Provider
      initial={{
        layers: [
          {
            id: crypto.randomUUID(),
            publicId: '',
            url: '',
            width: 0,
            height: 0,
          },
        ],
        layerComparisonMode: false,
      }}
    >
      <ImageStore.Provider initial={{ generating: false }}>
        <div>
          <UploadImage />
          <TestButton />
        </div>
      </ImageStore.Provider>
    </LayerStore.Provider>
  );
};
