import { Layers2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LayersStore } from '@/store/layers-store';
import { createEmptyLayer } from '@/store/utils/create-empty-layer';

export const AddLayerButton = () => {
  const addLayer = LayersStore.useStore((state) => state.addLayer);

  const handleClick = () => {
    addLayer(createEmptyLayer());
  };

  return (
    <Button
      variant="outline"
      icon={Layers2}
      className="flex w-full gap-4"
      onClick={handleClick}
    >
      Create Layer
    </Button>
  );
};
