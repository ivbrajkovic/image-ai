'use client';

import { Eraser } from 'lucide-react';
import { useState } from 'react';

import { LayersStore } from '@/components/layers-sidebar/layers-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { genRemove } from '@/server/gen-remove-action';
import { ImageStore } from '@/store/image-store';

export const GenRemove = () => {
  const [activeTag, setActiveTag] = useState('');

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const addLayer = LayersStore.useStore((state) => state.addLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTag(e.target.value);
  };

  const handleRemove = async () => {
    if (!activeLayer.url) return;

    setGenerating(true);
    const newLayerId = crypto.randomUUID();

    const response = await genRemove({
      prompt: activeTag,
      activeImageUrl: activeLayer.url,
    });
    console.log({ response });

    if (response?.data?.url) {
      addLayer({
        ...activeLayer,
        id: newLayerId,
        url: response.data.url,
        name: `Gen Remove ${activeLayer.name}`,
        resourceType: 'image',
      });
      setActiveLayer(newLayerId);
    }

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
          <Input
            className="col-span-2 h-8"
            value={activeTag}
            onChange={handleChangeTag}
          />
        </div>
        <Button className="mt-4 w-full" onClick={handleRemove}>
          Magic Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};
