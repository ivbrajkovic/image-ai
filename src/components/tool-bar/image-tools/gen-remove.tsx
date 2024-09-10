'use client';

import { Eraser } from 'lucide-react';
import { useState } from 'react';

import { LayersStore } from '@/components/layers-bar/layers-store';
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
    const newLayerId = crypto.randomUUID();

    const response = await genRemove({
      prompt: 'Remove the selected object',
      activeImageUrl: 'some url',
    });

    console.log({ response });
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer.url}>
        <Button className="p-8">
          <span className="flex flex-col items-center justify-center gap-1 text-xs">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div>
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
