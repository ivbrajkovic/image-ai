'use client';

import { Button } from '@/components/ui/button';
import { ImageStore } from '@/store/image-store';

export const GeneratingButton = () => {
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
