import { Layer, LayersStore } from '@/store/layers-store';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

export const useAddImageLayer = () => {
  const addLayer = LayersStore.useStore((state) => state.addLayer);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const addImageLayer = (props: Partial<Layer>) => {
    if (!activeLayer) throw new Error('No active layer.');
    if (!activeLayer.name) throw new Error('No active layer name.');

    // const newLayerId = crypto.randomUUID();
    const newName = incrementFilenameNumber(activeLayer.name);
    const layer: Layer = {
      ...activeLayer,
      ...props,
      // id: newLayerId,
      name: newName,
    };
    addLayer(layer);
    setActiveLayer(layer);
  };

  return { addImageLayer };
};
