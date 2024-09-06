import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createZustandContext } from '@/lib/createZustandContext';

export type ImageState = {
  generating: boolean;
};
export type ImageActions = {
  setGenerating: (generating: boolean) => void;
};
export type ImageStore = ImageState & ImageActions;

const createImageStore = (initialState: ImageState) =>
  createStore<ImageStore>()(
    persist(
      immer((set) => ({
        ...initialState,
        setGenerating: (generating) => set({ generating }),
      })),
      { name: 'image-store' },
    ),
  );

export const ImageStore = createZustandContext(createImageStore);
