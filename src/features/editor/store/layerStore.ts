import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createZustandContext } from '@/lib/createZustandContext';

type Layer = {
  id?: string;
  publicId?: string;
  width?: number;
  height?: number;
  url?: string;
  name?: string;
  format?: string;
  poster?: string;
  resourceType?: string;
  transcriptionUrl?: string;
};
export type LayerState = {
  activeLayer: Layer;
  layers: Layer[];
  layerComparisonMode: boolean;
  comparedLayersId: string[];
};
export type LayerActions = {
  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
  updateLayer: (layer: Layer) => void;
  setActiveLayerId: (id: string) => void;
  setPoster: (id: string, posterUrl: string) => void;
  setTranscriptionUrl: (id: string, transcriptionUrl: string) => void;
  setLayerComparisonMode: (mode: boolean) => void;
  setComparedLayerIds: (ids: string[]) => void;
  toggleComparedLayerId: (id: string) => void;
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
        layerComparisonMode: initialState.layerComparisonMode,
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
            state.layers[index] = layer;
          }),

        setActiveLayerId: (id) =>
          set((state) => {
            const layer = state.layers.find((layer) => layer.id === id);
            state.activeLayer = layer ?? state.layers[0];
          }),

        setPoster: (id, posterUrl) =>
          set((state) => {
            const index = state.layers.findIndex((layer) => layer.id === id);
            state.layers[index].poster = posterUrl;
          }),

        setTranscriptionUrl: (id, transcriptionUrl) =>
          set((state) => {
            const index = state.layers.findIndex((layer) => layer.id === id);
            state.layers[index].transcriptionUrl = transcriptionUrl;
          }),

        setLayerComparisonMode: (mode) =>
          set((state) => {
            state.layerComparisonMode = mode;
            state.comparedLayersId = [];
          }),

        setComparedLayerIds: (ids) =>
          set((state) => {
            state.comparedLayersId = ids;
            state.layerComparisonMode = ids.length > 0;
          }),

        toggleComparedLayerId: (id) =>
          set((state) => {
            const index = state.comparedLayersId.indexOf(id);
            if (index === -1) state.comparedLayersId.push(id);
            else state.comparedLayersId.splice(index, 1);
            state.layerComparisonMode = state.comparedLayersId.length > 0;
          }),
      })),
      { name: 'layer-store' },
    ),
  );
};

export const LayerStore = createZustandContext(createLayerStore);
