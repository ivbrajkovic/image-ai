'use client';

import { ImageOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { ActionButton } from '@/components/tools-sidebar/components/action-button';
import { useAddImageLayer } from '@/components/tools-sidebar/image-tools/hooks/useAddImageLayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRenderCount } from '@/hooks/use-render-count';
import { bgReplace } from '@/server/bg-replace-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

type FormValues = { prompt: string };

export const BgReplace = () => {
  useRenderCount('BgReplace');

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  const form = useForm<FormValues>({ defaultValues: { prompt: '' } });
  const { addImageLayer } = useAddImageLayer();

  const handleSubmit = ({ prompt }: FormValues) => {
    if (!activeLayer.url) return;
    setGenerating(true);

    bgReplace({ prompt, url: activeLayer.url })
      .then((response) => {
        if (response?.serverError) throw new Error(response.serverError);
        if (!response?.data?.url) throw new Error('No URL returned');
        addImageLayer({ url: response.data.url });
        form.resetField('prompt');
      })
      .catch(console.error)
      .finally(() => setGenerating(false));
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <ImageOff size={16} />
          <span className="text-sm">Background Replace</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-4">
            <h3>Background Replace</h3>
            <p className="text-sm text-muted-foreground">
              Replace the background from an image with AI generated content.
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="selection">Selection</Label>
            <Input
              className="col-span-2 h-8"
              {...form.register('prompt', { required: true })}
            />
          </div>
          <ActionButton type="submit" disabled={!activeLayer.url}>
            Remove Background
          </ActionButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
