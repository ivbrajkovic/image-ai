'use client';

import { Button } from '@/components/ui/button';
import { UploadImage } from '@/features/editor/component/upload-image';
import { selectGenerating, setGenerating } from '@/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const Editor = () => {
  const dispatch = useAppDispatch();
  const generating = useAppSelector(selectGenerating);

  const handleSave = () => {
    dispatch(setGenerating(!generating));
  };

  return (
    <div>
      <Button onClick={handleSave}>Save</Button>
      <h1>{generating ? 'generating' : 'not generating'}</h1>

      <UploadImage />
    </div>
  );
};
