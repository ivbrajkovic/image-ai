'use client';

import { Image as ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionButton } from '@/features/tools/components/action-button';
import { useLayerAction } from '@/features/tools/hooks/use-layer-action';
import { cartoonify } from '@/server/cartoonify-action';

export const Cartoonify = () => {
  const { activeLayer, performAction } = useLayerAction();

  const handleCartoonify = () =>
    performAction({
      action: cartoonify,
      options: { errorMessageTitle: 'Failed to cartoonify image.' },
    });

  if (!activeLayer) return null;

  return (
    <Popover>
      <PopoverTrigger asChild disabled={!activeLayer}>
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
        <ActionButton disabled={!activeLayer.url} onClick={handleCartoonify}>
          Cartoonify Image
        </ActionButton>
      </PopoverContent>
    </Popover>
  );
};
