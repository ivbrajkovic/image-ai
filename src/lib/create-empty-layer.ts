import { Layer } from '@/features/editor/store/layers-store';

export const createEmptyLayer = (): Layer => ({
  id: crypto.randomUUID(),
  name: '',
  url: '',
  width: 0,
  height: 0,
  publicId: '',
  format: '',
});
