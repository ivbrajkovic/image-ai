'use client';

import { ActiveImage } from '@/features/editor/component/active-image';
import { UploadImage } from '@/features/editor/component/upload-image';
import { ImageComparison } from '@/features/layers/components/image-comparison';
import { Layer, LayersStore } from '@/store/layers-store';

type EditorProps = {
  layers: Layer[];
};

export const Editor = (props: EditorProps) => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  if (comparisonMode) return <ImageComparison layers={props.layers} />;
  if (activeLayer.url) return <ActiveImage />;
  return <UploadImage />;
};
