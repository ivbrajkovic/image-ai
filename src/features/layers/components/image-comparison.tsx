'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

import { Layer, LayersStore } from '@/store/layers-store';

type ImageComparisonProps = { layers: Layer[] };

export const ImageComparison = (props: ImageComparisonProps) => {
  const comparedLayersId = LayersStore.useStore(
    (state) => state.comparedLayersId,
  );

  const comparisonLayers = comparedLayersId.flatMap((id) => {
    const layer = props.layers.find((layer) => layer.id === id);
    return layer ? [layer] : [];
  });

  if (!comparisonLayers.length) return <div>No layers selected.</div>;

  return (
    <div className="h-full bg-secondary p-0 md:p-16">
      {comparisonLayers.length === 1 ? (
        <div className="relative flex size-full items-center justify-center">
          <ReactCompareSliderImage
            src={comparisonLayers[0].url ?? ''}
            alt={comparisonLayers[0].name ?? 'Single image'}
            className="absolute inset-0 rounded-lg !object-contain"
          />
        </div>
      ) : (
        <ReactCompareSlider
          className="relative flex size-full items-center justify-center"
          itemOne={
            <ReactCompareSliderImage
              src={comparisonLayers[0].url ?? ''}
              alt={comparisonLayers[0].name ?? 'Image one'}
              className="absolute inset-0 rounded-lg !object-contain"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={comparisonLayers[1].url ?? ''}
              alt={comparisonLayers[1].name ?? 'Image two'}
              className="absolute inset-0 rounded-lg !object-contain"
            />
          }
        />
      )}
    </div>
  );
};
