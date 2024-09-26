import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createZustandContext } from '@/store/utils/create-zustand-context';
import { Tables } from '@/supabase/database.types';

export type Layer = Tables<'layers'>;
export type LayerState = {
  activeLayer: Layer | null;
  layers: Layer[];
  comparisonMode: boolean;
  comparedLayers: Layer[];
};
export type LayerActions = {
  addLayer: (layer: Layer) => void;
  setActiveLayer: (layer: Layer) => void;
  setComparedLayers: (layers: Layer[]) => void;
  toggleComparedLayer: (layer: Layer) => void;
};
export type LayerStore = LayerState & LayerActions;

const createLayerStore = (initialState: { layerComparisonMode: boolean }) => {
  return createStore<LayerStore>()(
    persist(
      immer((set) => {
        return {
          activeLayer: null,
          layers: [],
          comparisonMode: initialState.layerComparisonMode,
          comparedLayers: [],

          addLayer: (layer) =>
            set((state) => {
              state.layers.push(layer);
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
