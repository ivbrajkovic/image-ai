'use client';

import { ActiveImage } from '@/components/editor/component/active-image';
import { UploadImage } from '@/components/editor/component/upload-image';
import { ImageComparison } from '@/components/layers-sidebar/components/image-comparison';
import { LayersStore } from '@/components/layers-sidebar/layers-store';

export const Editor = () => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  if (comparisonMode) return <ImageComparison />;
  if (activeLayer.url) return <ActiveImage />;
  return <UploadImage />;
};
