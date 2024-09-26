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
import { useLayerAction } from '@/features/tools/hooks/use-layer-action';
import { genRemove } from '@/server/gen-remove-action';

type FormValues = { prompt: string };

export const GenRemove = () => {
  const { activeLayer, performAction } = useLayerAction();
  const form = useForm<FormValues>({ defaultValues: { prompt: '' } });

  const handleSubmit = ({ prompt }: FormValues) =>
    performAction({
      action: genRemove,
      params: { prompt },
      options: { errorMessageTitle: 'Failed to remove content.' },
    });

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
