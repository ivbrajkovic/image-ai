'use client';

import { Layers2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LayerImage } from '@/features/editor/component/layers/layer-image';
import { LayerInfo } from '@/features/editor/component/layers/layer-info';
import { ImageStore } from '@/features/editor/store/image-store';
import { LayersStore } from '@/features/editor/store/layers-store';
import { createEmptyLayer } from '@/lib/create-empty-layer';
import { cn } from '@/lib/utils';

export const Layers = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const layers = LayersStore.useStore((state) => state.layers);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const addLayer = LayersStore.useStore((state) => state.addLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleSetActiveLayer = (layerId: string) => () => {
    if (!generating) setActiveLayer(layerId);
  };

  return (
    <Card className="relative flex flex-col overflow-x-hidden overflow-y-scroll shadow-2xl scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-track-rounded-full  scrollbar-thumb-rounded-full">
      <CardHeader className="">
        <div>
          <CardTitle className="text-sm">
            {activeLayer.name ?? 'Layers'}
          </CardTitle>
          {activeLayer.width && activeLayer.height ? (
            <CardDescription className="text-xs">
              {activeLayer.width} x {activeLayer.height}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer rounded-sm border border-transparent ease-in-out hover:bg-secondary',
              {
                'animate-pulse': generating,
                'border-primary': activeLayer.id === layer.id,
              },
            )}
            onClick={handleSetActiveLayer(layer.id)}
          >
            <div className="relative flex items-center p-4">
              <div className="flex h-8 w-full items-center justify-between gap-2">
                {!layer.url ? (
                  <p className="justify-self-end text-sm font-medium">
                    New Layer
                  </p>
                ) : (
                  <>
                    <LayerImage
                      url={layer.url}
                      name={layer.name}
                      poster={layer.poster}
                      format={layer.format}
                    />
                    <LayerInfo
                      id={layer.id}
                      name={layer.name}
                      format={layer.format}
                      width={layer.width}
                      height={layer.height}
                      index={index}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="sticky bottom-0 flex shrink-0 gap-2 bg-card">
        <Button
          variant="outline"
          className="flex w-full gap-2"
          onClick={addLayer.bind(null, createEmptyLayer())}
        >
          <span>Create Layer</span>
          <Layers2 size={18} className="text-secondary-foreground" />
        </Button>
      </div>
    </Card>
  );
};
