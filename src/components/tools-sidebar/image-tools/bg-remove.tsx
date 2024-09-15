'use client';

import { Image as ImageIcon } from 'lucide-react';

import { ActionButton } from '@/components/tools-sidebar/components/action-button';
import { useAddImageLayer } from '@/components/tools-sidebar/image-tools/hooks/useAddImageLayer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRenderCount } from '@/hooks/use-render-count';
import { bgRemove } from '@/server/bg-remove-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const BgRemove = () => {
  useRenderCount('BgRemove');

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  const { addImageLayer } = useAddImageLayer();

  const handleRemove = () => {
    if (!activeLayer.url || !activeLayer.format) return;
    setGenerating(true);

    bgRemove({ format: activeLayer.format, url: activeLayer.url })
      .then((response) => {
        if (response?.serverError) throw new Error(response.serverError);
        if (!response?.data?.url) throw new Error('No URL returned');
        addImageLayer({ url: response.data.url, format: 'png' });
      })
      .catch(console.error)
      .finally(() => setGenerating(false));
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <ImageIcon size={16} />
          <span className="text-sm">Background Removal</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="mb-4">
          <h3>Background Removal</h3>
          <p className="text-sm text-muted-foreground">
            Remove the background from an image using AI
          </p>
        </div>
        <ActionButton disabled={!activeLayer.url} onClick={handleRemove}>
          Remove Background
        </ActionButton>
      </PopoverContent>
    </Popover>
  );
};
