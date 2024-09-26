'use client';

import { Image as ImageIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionButton } from '@/features/tools/components/action-button';
import { useToast } from '@/hooks/use-toast';
import { bgRemove } from '@/server/bg-remove-action';
import { createLayerAction } from '@/server/create-layer-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';
import { ensureValue } from '@/utils/get-or-throw';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

export const BgRemove = () => {
  const { toast } = useToast();
  const createLayer = useAction(createLayerAction);

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleActionError = (error: unknown) => {
    const description =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An error occurred';
    toast({
      variant: 'destructive',
      title: 'Failed to remove background',
      description,
    });
  };

  const handleBackgroundRemove = () => {
    const url = ensureValue(activeLayer?.url, 'No active layer URL.');
    const name = ensureValue(activeLayer?.name, 'No active layer name.');
    const format = ensureValue(activeLayer?.format, 'No active layer format.');
    setGenerating(true);

    bgRemove({ url, format })
      .then((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        const newUrl = ensureValue(data?.url, 'No image URL received');
        const newName = incrementFilenameNumber(name);
        return { url: newUrl, name: newName, format: 'png' };
      })
      .then(createLayer.executeAsync)
      .then((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        if (!data || !data.length) throw new Error('No layer data received');
        setActiveLayer(data[0]);
      })
      .catch(handleActionError)
      .finally(setGenerating.bind(null, false));
  };

  if (!activeLayer) return null;

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <ImageIcon size={16} />
          <span className="text-sm">Background Removal</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="mb-4">
          <h3>Background Removal</h3>
          <p className="text-sm text-muted-foreground">
            Remove the background from an image using AI
          </p>
        </div>
        <ActionButton
          disabled={!activeLayer.url}
          onClick={handleBackgroundRemove}
        >
          Remove Background
        </ActionButton>
      </PopoverContent>
    </Popover>
  );
};
