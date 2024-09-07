'use client';

import { Button } from '@/components/ui/button';
import { ImageStore } from '@/features/editor/store/imageStore';

export const TestButton = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const setGenerating = ImageStore.useStore((state) => state.setGenerating);

  const handleClick = () => {
    console.log('click');
    setGenerating(!generating);
  };

  return (
    <div>
      <h1>{generating ? 'generating' : 'not generating'}</h1>
      <Button onClick={handleClick}>Set Generating</Button>
    </div>
  );
};
