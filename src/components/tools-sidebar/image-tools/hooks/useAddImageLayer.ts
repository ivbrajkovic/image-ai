import { Layer, LayersStore } from '@/components/layers-sidebar/layers-store';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

export const useAddImageLayer = () => {
  const addLayer = LayersStore.useStore((state) => state.addLayer);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const addImageLayer = (props: Partial<Layer>) => {
    if (!activeLayer.name)
      return console.error('addImageLayer: Active layer name is missing.');

    const newLayerId = crypto.randomUUID();
    const newName = incrementFilenameNumber(activeLayer.name);
    addLayer({
      ...activeLayer,
      ...props,
      id: newLayerId,
      name: newName,
    });
    setActiveLayer(newLayerId);
  };

  return { addImageLayer };
};
