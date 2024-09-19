'use client';

import { ImageOff } from 'lucide-react';
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
import { bgReplace } from '@/server/bg-replace-action';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

type FormValues = { prompt: string };

export const BgReplace = () => {
  const { toast } = useToast();
  const { addImageLayer } = useAddImageLayer();
  const form = useForm<FormValues>({ defaultValues: { prompt: '' } });

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  const errorToast = (description: string) =>
    toast({
      variant: 'destructive',
      title: 'Failed to replace background',
      description,
    });

  const handleSubmit = ({ prompt }: FormValues) => {
    if (!activeLayer.url) throw new Error('No active layer');
    setGenerating(true);

    bgReplace({ prompt, url: activeLayer.url })
      .then((response) => {
        if (response?.serverError) return errorToast(response.serverError);
        if (!response?.data?.url) return errorToast('No image URL received');
        addImageLayer({ url: response.data.url });
        form.resetField('prompt');
      })
      .finally(() => setGenerating(false));
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-start gap-4">
          <ImageOff size={16} className="text-secondary-foreground" />
          <span className="text-sm">Background Replace</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-4">
            <h3>Background Replace</h3>
            <p className="text-sm text-muted-foreground">
              Replace the background from an image with AI generated content.
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
            Replace Background
          </ActionButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
