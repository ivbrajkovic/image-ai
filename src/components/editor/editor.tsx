'use client';

import { ActiveImage } from '@/components/editor/component/active-image';
import { UploadFrom } from '@/components/editor/component/upload-from';
import { LayersStore } from '@/components/layers-bar/layers-store';

export const Editor = () => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  if (activeLayer.url) return <ActiveImage />;
  return <UploadFrom />;
};
