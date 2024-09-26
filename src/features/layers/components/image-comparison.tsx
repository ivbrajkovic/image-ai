'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

import { LayersStore } from '@/store/layers-store';

export const ImageComparison = () => {
  const comparedLayers = LayersStore.useStore((state) => state.comparedLayers);

  if (!comparedLayers.length) return <div>No layers selected.</div>;

  return (
    <div className="h-full bg-secondary p-0 md:p-16">
      {comparedLayers.length === 1 ? (
        <div className="relative flex size-full items-center justify-center">
          <ReactCompareSliderImage
            src={comparedLayers[0].url ?? ''}
            alt={comparedLayers[0].name ?? 'Single image'}
            className="absolute inset-0 rounded-lg !object-contain"
          />
        </div>
      ) : (
        <ReactCompareSlider
          className="relative flex size-full items-center justify-center"
          itemOne={
            <ReactCompareSliderImage
              src={comparedLayers[0].url ?? ''}
              alt={comparedLayers[0].name ?? 'Image one'}
              className="absolute inset-0 rounded-lg !object-contain"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={comparedLayers[1].url ?? ''}
              alt={comparedLayers[1].name ?? 'Image two'}
              className="absolute inset-0 rounded-lg !object-contain"
            />
          }
        />
      )}
    </div>
  );
};
