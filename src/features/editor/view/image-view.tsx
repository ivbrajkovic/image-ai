import { ActiveImage } from '@/features/editor/component/active-image';
import { UploadFrom } from '@/features/editor/component/upload/upload-from';
import { LayersStore } from '@/features/editor/store/layers-store';

export const ImageView = () => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  if (activeLayer.url) return <ActiveImage />;
  return <UploadFrom />;
};
