'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

import { LayersStore } from '@/components/layers-sidebar/layers-store';

export const ImageComparison = () => {
  const layers = LayersStore.useStore((state) => state.layers);

  const comparedLayersId = LayersStore.useStore(
    (state) => state.comparedLayersId,
  );

  const comparisonLayers = comparedLayersId.flatMap((id) => {
    const layer = layers.find((layer) => layer.id === id);
    return layer ? [layer] : [];
  });

  if (!comparisonLayers.length) return <div>No layers selected.</div>;

  return (
    <div className="h-svh bg-secondary p-24">
      <div className="relative flex size-full items-center justify-center">
        {comparisonLayers.length === 1 ? (
          <ReactCompareSliderImage
            src={comparisonLayers[0].url || ''}
            srcSet={comparisonLayers[0].url || ''}
            alt={comparisonLayers[0].name || 'Single image'}
            className="rounded-lg !object-contain"
          />
        ) : (
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={comparisonLayers[0].url || ''}
                srcSet={comparisonLayers[0].url || ''}
                alt={comparisonLayers[0].name || 'Image one'}
                className="rounded-lg object-contain"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={comparisonLayers[1].url || ''}
                srcSet={comparisonLayers[1].url || ''}
                alt={comparisonLayers[1].name || 'Image two'}
                className="rounded-lg object-contain"
              />
            }
          />
        )}
      </div>
    </div>
  );
};
