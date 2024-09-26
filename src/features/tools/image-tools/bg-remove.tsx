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
import { bgRemove } from '@/server/bg-remove-action';

export const BgRemove = () => {
  const { activeLayer, performAction } = useLayerAction();

  const handleBackgroundRemove = () =>
    performAction({
      action: bgRemove,
      options: { errorMessageTitle: 'Failed to remove background.' },
    });

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
