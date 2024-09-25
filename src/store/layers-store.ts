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
  comparedLayersId: number[];
};
export type LayerActions = {
  addLayer: (layer: Layer) => void;
  removeLayer: (id: number) => void;
  updateLayer: (layer: Layer) => void;
  setActiveLayer: (id: number) => void;
  setComparedLayerIds: (ids: number[]) => void;
  toggleComparedLayerId: (id: number) => void;
};

export type LayerStore = LayerState & LayerActions;

const createLayerStore = (initialState: {
  layers: Layer[];
  layerComparisonMode: boolean;
}) => {
  return createStore<LayerStore>()(
    persist(
      immer((set) => ({
        activeLayer: initialState.layers[0],
        layers: initialState.layers,
        comparisonMode: initialState.layerComparisonMode,
        comparedLayersId: [],

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

        setActiveLayer: (id) =>
          set((state) => {
            const layer = state.layers.find((layer) => layer.id === id);
            state.activeLayer = layer ?? state.layers[0];
          }),

        setComparedLayerIds: (ids) =>
          set((state) => {
            state.comparedLayersId = ids;
            state.comparisonMode = ids.length > 0;
          }),

        toggleComparedLayerId: (id) =>
          set((state) => {
            if (state.comparedLayersId.includes(id)) {
              state.comparedLayersId = state.comparedLayersId.filter(
                (layerId) => layerId !== id,
              );
            } else if (state.comparedLayersId.length < 2) {
              state.comparedLayersId.push(id);
            } else {
              state.comparedLayersId[1] = id;
            }
            state.comparisonMode = state.comparedLayersId.length > 0;
          }),
      })),
      { name: 'layer-store' },
    ),
  );
};

export const LayersStore = createZustandContext(createLayerStore);
