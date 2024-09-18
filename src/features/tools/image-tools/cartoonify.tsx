'use client';

import { Image as ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionButton } from '@/features/tools/components/action-button';
import { useAddImageLayer } from '@/features/tools/image-tools/hooks/useAddImageLayer';
import { useToast } from '@/hooks/use-toast';
import { cartoonify } from '@/server/cartoonify-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const Cartoonify = () => {
  const { toast } = useToast();

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  const { addImageLayer } = useAddImageLayer();

  const handleClick = () => {
    if (!activeLayer.url) throw new Error('No active layer');
    if (!activeLayer.format) throw new Error('No active layer format');
    setGenerating(true);
    cartoonify({ url: activeLayer.url })
      .then((response) => {
        if (response?.serverError) throw new Error(response.serverError);
        if (!response?.data?.url) throw new Error('No URL returned');
        addImageLayer({ url: response.data.url, format: 'png' });
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to remove background',
          description: error.message,
        });
      })
      .finally(() => setGenerating(false));
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <ImageIcon size={16} />
          <span className="text-sm">Cartoonify</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="mb-4">
          <h3>Cartoonify</h3>
          <p className="text-sm text-muted-foreground">
            Convert the image into a cartoon.
          </p>
        </div>
        <ActionButton disabled={!activeLayer.url} onClick={handleClick}>
          Cartoonify Image
        </ActionButton>
      </PopoverContent>
    </Popover>
  );
};
