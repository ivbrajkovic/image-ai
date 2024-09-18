'use client';

import { Eraser } from 'lucide-react';
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
import { useAddImageLayer } from '@/features/tools/image-tools/hooks/useAddImageLayer';
import { useToast } from '@/hooks/use-toast';
import { genRemove } from '@/server/gen-remove-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

type FormValues = { prompt: string };

export const GenRemove = () => {
  const { toast } = useToast();

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  const form = useForm<FormValues>({ defaultValues: { prompt: '' } });
  const { addImageLayer } = useAddImageLayer();

  const handleSubmit = ({ prompt }: FormValues) => {
    if (!activeLayer.url) throw new Error('No active layer');
    setGenerating(true);

    genRemove({ prompt, url: activeLayer.url })
      .then((response) => {
        if (response?.serverError) throw new Error(response.serverError);
        if (!response?.data?.url) throw new Error('No URL returned');
        addImageLayer({ url: response.data.url });
        form.resetField('prompt');
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to remove content',
          description: error.message,
        });
      })
      .finally(() => setGenerating(false));
  };

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
            Magic Remove
          </ActionButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
