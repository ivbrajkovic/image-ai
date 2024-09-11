'use client';

import { Eraser } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { LayersStore } from '@/components/layers-sidebar/layers-store';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRenderCount } from '@/hooks/use-render-count';
import { genRemove } from '@/server/gen-remove-action';
import { ImageStore } from '@/store/image-store';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

type RemoveButtonProps = {
  handleRemove: () => void;
};

const RemoveButton = (props: RemoveButtonProps) => {
  const generating = ImageStore.useStore((state) => state.generating);
  return (
    <ButtonLoading
      isLoading={generating}
      className="mt-4 w-full"
      onClick={props.handleRemove}
    >
      Magic Remove
    </ButtonLoading>
  );
};

export const GenRemove = () => {
  useRenderCount('GenRemove');
  const form = useForm({ defaultValues: { tag: '' } });

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const addLayer = LayersStore.useStore((state) => state.addLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const addImageLayer = async (filename: string, url: string) => {
    const newLayerId = crypto.randomUUID();
    const newName = incrementFilenameNumber(filename);
    addLayer({
      ...activeLayer,
      url,
      id: newLayerId,
      name: newName,
      resourceType: 'image',
    });
    setActiveLayer(newLayerId);
  };

  const handleRemove = async () => {
    if (!activeLayer.url) return;
    if (!activeLayer.name) return;

    setGenerating(true);

    const prompt = form.getValues('tag');
    const activeImageUrl = activeLayer.url;

    const response = await genRemove({ prompt, activeImageUrl });
    if (response?.data?.url) addImageLayer(activeLayer.name, response.data.url);

    setGenerating(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="flex items-center justify-center gap-2">
          <span className="text-sm">Content Aware</span>
          <Eraser size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="mb-4">
          <h3>Smart Ai Remove</h3>
          <p className="text-sm text-muted-foreground">
            Generative Remove any part of the image
          </p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="selection">Selection</Label>
          <Input className="col-span-2 h-8" {...form.register('tag')} />
        </div>
        <RemoveButton handleRemove={handleRemove} />
      </PopoverContent>
    </Popover>
  );
};
