'use client';

import { Ellipsis, Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteLayerAction } from '@/server/delete-layer-action';
import { Layer } from '@/store/layers-store';
import { stopPropagation } from '@/utils/stop-propagation';

type LayersInfoProps = Pick<
  Layer,
  'id' | 'name' | 'format' | 'width' | 'height'
> & { onDeleteLayer: () => void };

export const LayerInfo = (props: LayersInfoProps) => {
  const deleteLayer = useAction(deleteLayerAction);

  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);

  const handleDeleteLayer = () => {
    deleteLayer.execute({ id: props.id });
    props.onDeleteLayer();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTitle className="hidden">Layer Info</DialogTitle>
      <DialogTrigger onClick={stopPropagation(toggleOpen)}>
        <Ellipsis size={14} />
      </DialogTrigger>
      <DialogContent onClick={stopPropagation()}>
        <h3>Layer {props.id}</h3>
        <div className="space-y-0.5 py-4">
          <p>
            <span className="font-bold">Filename:</span> {props.name}
          </p>
          <p>
            <span className="font-bold">Format:</span> {props.format}
          </p>
          <p>
            <span className="font-bold">Size:</span> {props.width}X
            {props.height}
          </p>
        </div>
        <Button
          isLoading={deleteLayer.isExecuting || deleteLayer.hasSucceeded}
          onClick={handleDeleteLayer}
        >
          <span className="mr-2">Delete Layer</span>
          <Trash2 size={16} />
        </Button>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
