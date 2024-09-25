import { Layers2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { createLayer } from '@/server/create-layer-action';
import { LayersStore } from '@/store/layers-store';
import { createEmptyLayer } from '@/store/utils/create-empty-layer';

export const CreateLayerButton = () => {
  const addLayer = LayersStore.useStore((state) => state.addLayer);

  const action = useAction(createLayer);

  const handleClick = () => {
    addLayer(createEmptyLayer());
  };

  return (
    <Button
      isLoading={action.isExecuting}
      variant="outline"
      icon={Layers2}
      className="flex w-full gap-4"
      onClick={action.execute.bind(null, void 0)}
    >
      Create Layer
    </Button>
  );
};
