'use client';

import { Button } from '@/components/ui/button';
import { UploadImage } from '@/features/editor/component/UploadImage';
import { ImageStore, useImageStore } from '@/features/editor/imageStore';

const TestButton = () => {
  const generating = useImageStore((state) => state.generating);
  const setGenerating = useImageStore((state) => state.setGenerating);

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
    <ImageStore.Provider>
      <div>
        <UploadImage />
        <TestButton />
      </div>
    </ImageStore.Provider>
  );
};
