'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { AddLayerButton } from '@/components/layers-sidebar/components/add-layer-button';
import { ComparisonButton } from '@/components/layers-sidebar/components/comparison-button';
import { LayerImage } from '@/components/layers-sidebar/components/layer-image';
import { LayerInfo } from '@/components/layers-sidebar/components/layer-info';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const LayersSidebar = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const layers = LayersStore.useStore((state) => state.layers);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  const comparedLayersId = LayersStore.useStore(
    (state) => state.comparedLayersId,
  );
  const toggleComparedLayerId = LayersStore.useStore(
    (state) => state.toggleComparedLayerId,
  );

  const getImageUrl = (id: string) => {
    const layer = layers.find((layer) => layer.id === id);
    return layer?.url || '';
  };

  const handleSetActiveLayer = (layerId: string) => () => {
    if (generating) return;
    else if (comparisonMode) toggleComparedLayerId(layerId);
    else setActiveLayer(layerId);
  };

  return (
    <Card className="relative flex flex-col overflow-x-hidden overflow-y-scroll shadow-2xl scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-track-rounded-full  scrollbar-thumb-rounded-full">
      <CardHeader className="sticky top-0 z-50 min-h-24 bg-card p-4 shadow-sm">
        {comparisonMode ? (
          <div>
            <CardTitle className="pb-2 text-sm">Comparing...</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={getImageUrl(comparedLayersId[0])}
              />
              {comparedLayersId.length > 0 ? <ArrowRight /> : null}
              {comparedLayersId.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={getImageUrl(comparedLayersId[1])}
                />
              ) : (
                'Nothing here'
              )}
            </CardDescription>
          </div>
        ) : null}
        <CardTitle className="text-sm">
          {activeLayer.name || 'Layers'}
        </CardTitle>
        {activeLayer.width && activeLayer.height ? (
          <CardDescription className="text-xs">
            {activeLayer.width} x {activeLayer.height}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer rounded-sm border border-transparent ease-in-out hover:bg-secondary',
              {
                'animate-pulse': generating,
                'border-primary': comparisonMode
                  ? comparedLayersId.includes(layer.id)
                  : activeLayer.id === layer.id,
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
                ) : null}
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
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="sticky bottom-0 flex shrink-0 flex-col gap-2 bg-card p-2">
        <AddLayerButton />
        <ComparisonButton />
      </div>
    </Card>
  );
};
