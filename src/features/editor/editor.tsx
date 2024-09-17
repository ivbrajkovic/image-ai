'use client';

import { ActiveImage } from '@/features/editor/component/active-image';
import { UploadImage } from '@/features/editor/component/upload-image';
import { ImageComparison } from '@/features/layers/components/image-comparison';
import { LayersStore } from '@/store/layers-store';

export const Editor = () => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  if (comparisonMode) return <ImageComparison />;
  if (activeLayer.url) return <ActiveImage />;
  return <UploadImage />;
};
