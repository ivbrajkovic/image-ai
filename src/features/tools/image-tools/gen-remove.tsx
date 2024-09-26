'use client';

import { Eraser } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionButton } from '@/features/tools/components/action-button';
import { useToast } from '@/hooks/use-toast';
import { createLayerAction } from '@/server/create-layer-action';
import { genRemove } from '@/server/gen-remove-action';
import { ImageStore } from '@/store/image-store';
import { Layer, LayersStore } from '@/store/layers-store';
import { ensureValue } from '@/utils/get-or-throw';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

type FormValues = { prompt: string };

export const GenRemove = () => {
  const { toast } = useToast();
  const createLayer = useAction(createLayerAction);
  const form = useForm<FormValues>({ defaultValues: { prompt: '' } });

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
      title: 'Failed to remove content.',
      description,
    });
  };

  const handleSubmit = ({ prompt }: FormValues) => {
    const url = ensureValue(activeLayer?.url, 'No active layer URL.');
    const name = ensureValue(activeLayer?.name, 'No active layer name.');
    setGenerating(true);

    genRemove({ url, prompt })
      .then<Partial<Layer>>((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        const newUrl = ensureValue(data?.url, 'No image URL received');
        const newName = incrementFilenameNumber(name);
        return {
          public_id: activeLayer?.public_id,
          url: newUrl,
          name: newName,
          format: activeLayer?.format,
          width: activeLayer?.width,
          height: activeLayer?.height,
        };
      })
      .then(createLayer.executeAsync)
      .then((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        const layer = ensureValue(data?.[0], 'No layer data received');
        setActiveLayer(layer);
      })
      .catch(handleActionError)
      .finally(setGenerating.bind(null, false));
  };

  if (!activeLayer) return null;

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <Eraser size={16} />
          <span className="text-sm">Content Removal</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-4">
            <h3>Smart Ai Remove</h3>
            <p className="text-sm text-muted-foreground">
              Generative Remove any part of the image
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="selection">Prompt</Label>
            <Input
              className="col-span-2 h-8"
              {...form.register('prompt', { required: true })}
            />
          </div>
          <ActionButton type="submit" disabled={!activeLayer.url}>
            Remove Content
          </ActionButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
