'use client';

import { Ellipsis, Trash2 } from 'lucide-react';

import { Layer, LayersStore } from '@/components/layers-bar/layers-store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type LayersInfoProps = Pick<
  Layer,
  'id' | 'name' | 'format' | 'width' | 'height'
> & { index: number };

export const LayerInfo = (props: LayersInfoProps) => {
  const layers = LayersStore.useStore((state) => state.layers);
  const removeLayer = LayersStore.useStore((state) => state.removeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleDeleteLayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Delete Layer', {
      id: props.id,
      index: props.index,
    });

    e.stopPropagation();
    setActiveLayer(props.index === 0 ? layers[1]?.id : layers[0]?.id);
    removeLayer(props.id);
  };

  return (
    <Dialog>
      {/* <DialogTitle>Layer Info</DialogTitle> */}
      <DialogTrigger>
        <Ellipsis size={14} />
      </DialogTrigger>
      <DialogContent>
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
        <Button onClick={handleDeleteLayer}>
          <span className="mr-2">Delete Layer</span>
          <Trash2 size={16} />
        </Button>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
