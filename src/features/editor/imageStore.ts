import { createZustandContext } from '@/lib/createZustandContext';
import { useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export type ImageState = {
  generating: boolean;
};

export type ImageActions = {
  setGenerating: (generating: boolean) => void;
};

export type ImageStore = ImageState & ImageActions;

const imageState: ImageState = {
  generating: false,
};

const createImageStore = () =>
  createStore<ImageStore>()(
    persist(
      immer((set) => ({
        ...imageState,
        setGenerating: (generating) => set({ generating }),
      })),
      {
        name: 'image-store',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: (state) => {
          console.log('hydration starts');

          // optional
          return (state, error) => {
            if (error) {
              console.log('an error happened during hydration', error);
            } else {
              console.log('hydration finished');
            }
          };
        },
      },
    ),
  );

export const ImageStore = createZustandContext(createImageStore);

export function useImageStore(): ImageStore;
export function useImageStore<T>(selector: (state: ImageStore) => T): T;
export function useImageStore<T>(selector?: (state: ImageStore) => T) {
  const store = ImageStore.useContext();
  return useStore(store, selector!);
}
