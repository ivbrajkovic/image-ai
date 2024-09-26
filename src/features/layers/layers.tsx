'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ComparisonButton } from '@/features/layers/components/comparison-button';
import { CreateLayerButton } from '@/features/layers/components/create-layer-button';
import { LayerImage } from '@/features/layers/components/layer-image';
import { LayerInfo } from '@/features/layers/components/layer-info';
import { cn } from '@/lib/utils';
import { ImageStore } from '@/store/image-store';
import { Layer, LayersStore } from '@/store/layers-store';

type LayersProps = {
  layers: Layer[];
};

export const Layers = (props: LayersProps) => {
  const layers = props.layers || [];

  // const layers = LayersStore.useStore((state) => state.layers);
  const generating = ImageStore.useStore((state) => state.generating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  // const removeLayer = LayersStore.useStore((state) => state.removeLayer);

  const comparedLayers = LayersStore.useStore((state) => state.comparedLayers);
  const toggleComparedLayerId = LayersStore.useStore(
    (state) => state.toggleComparedLayer,
  );

  const handleSetActiveLayer = (layer: Layer) => {
    if (generating) return;
    else if (comparisonMode) toggleComparedLayerId(layer);
    else setActiveLayer(layer);
  };

  const handleDeleteLayer = () => setActiveLayer(layers[0]);

  return (
    <Card className="grid h-full max-h-full grid-rows-[auto_1fr_auto] border-0">
      <CardHeader className="flex min-h-20 flex-col gap-2 bg-card p-4 shadow-sm">
        <div className="hidden flex-col text-left md:flex">
          <h2 className="text-lg font-semibold tracking-tight">Layers</h2>
          <p className="text-xs text-muted-foreground">
            Layers to manage your image edits.
          </p>
        </div>
        {comparisonMode ? (
          <div>
            <CardTitle className="pb-2 text-sm">Comparing...</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={comparedLayers[0].url ?? ''}
              />
              {comparedLayers.length > 0 ? <ArrowRight /> : null}
              {comparedLayers.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={comparedLayers[1].url ?? ''}
                />
              ) : (
                'Nothing here'
              )}
            </CardDescription>
          </div>
        ) : activeLayer ? (
          <div>
            <CardTitle className="text-sm">
              {activeLayer.name || 'Layers'}
            </CardTitle>
            {activeLayer.width && activeLayer.height ? (
              <CardDescription className="text-xs">
                {activeLayer.width} x {activeLayer.height}
              </CardDescription>
            ) : null}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="flex h-0 min-h-full flex-1 flex-col overflow-auto overflow-y-scroll px-2 scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer rounded-sm border border-transparent ease-in-out hover:bg-secondary',
              {
                'animate-pulse': generating,
                'border-primary': comparisonMode
                  ? comparedLayers.some(({ id }) => id === layer.id)
                  : activeLayer?.id === layer.id,
              },
            )}
            onClick={handleSetActiveLayer.bind(null, layer)}
          >
            <div className="relative flex items-center p-4">
              <div className="flex h-4 w-full items-center justify-between gap-2 md:h-8">
                {!layer.url ? (
                  <p className="justify-self-end text-sm font-medium">
                    New Layer
                  </p>
                ) : null}
                <LayerImage
                  url={layer.url}
                  name={layer.name}
                  format={layer.format}
                />
                <LayerInfo
                  id={layer.id}
                  name={layer.name}
                  format={layer.format}
                  width={layer.width}
                  height={layer.height}
                  onDeleteLayer={handleDeleteLayer}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="flex flex-col gap-2 bg-card p-2">
        <CreateLayerButton />
        <ComparisonButton />
      </div>
    </Card>
  );
};
