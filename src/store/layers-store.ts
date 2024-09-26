import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createZustandContext } from '@/store/utils/create-zustand-context';
import { Tables } from '@/supabase/database.types';

// export type Layer = {
//   id: number;
//   width?: number;
//   height?: number;
//   url?: string;
//   name?: string;
//   format?: string;
// };

export type Layer = Tables<'layers'>;

export type LayerState = {
  activeLayer: Layer;
  layers: Layer[];
  comparisonMode: boolean;
  comparedLayers: Layer[];
};
export type LayerActions = {
  addLayer: (layer: Layer) => void;
  removeLayer: (id: number) => void;
  updateLayer: (layer: Partial<Layer>) => void;
  setActiveLayer: (layer: Layer) => void;
  setComparedLayers: (layers: Layer[]) => void;
  toggleComparedLayer: (layer: Layer) => void;
};
export type LayerStore = LayerState & LayerActions;

const createLayerStore = (initialState: {
  layers: Layer[];
  layerComparisonMode: boolean;
}) => {
  return createStore<LayerStore>()(
    persist(
      immer((set) => {
        return {
          activeLayer: initialState.layers[0],
          layers: initialState.layers,
          comparisonMode: initialState.layerComparisonMode,
          comparedLayers: [],

          addLayer: (layer) =>
            set((state) => {
              state.layers.push(layer);
            }),

          removeLayer: (id) =>
            set((state) => {
              state.layers = state.layers.filter((layer) => layer.id !== id);
            }),

          updateLayer: (layer) =>
            set((state) => {
              const index = state.layers.findIndex((l) => l.id === layer.id);
              if (index !== -1) state.layers[index] = layer;
            }),

          setActiveLayer: (layer) =>
            set((state) => {
              state.activeLayer = layer;
            }),

          setComparedLayers: (layers) =>
            set((state) => {
              state.comparedLayers = layers;
              state.comparisonMode = layers.length > 0;
            }),

          toggleComparedLayer: (layer) =>
            set((state) => {
              if (state.comparedLayers.some(({ id }) => id === layer.id)) {
                state.comparedLayers = state.comparedLayers.filter(
                  ({ id }) => id !== layer.id,
                );
              } else if (state.comparedLayers.length < 2) {
                state.comparedLayers.push(layer);
              } else {
                state.comparedLayers[1] = layer;
              }
              state.comparisonMode = state.comparedLayers.length > 0;
            }),
        };
      }),
      { name: 'layer-store' },
    ),
  );
};

export const LayersStore = createZustandContext(createLayerStore);
