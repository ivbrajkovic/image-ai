import { Layers2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { createLayerAction } from '@/server/create-layer-action';
import { LayersStore } from '@/store/layers-store';

export const CreateLayerButton = () => {
  const action = useAction(createLayerAction);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleCreateLayer = async () => {
    const response = await action.executeAsync({});
    const { data, serverError, validationErrors } = response ?? {};

    // TODO: Handle errors
    if (serverError) console.error(serverError);
    else if (validationErrors) console.error(validationErrors);
    else if (data && data.length) setActiveLayer(data[0]);
  };

  return (
    <Button
      isLoading={action.isExecuting}
      variant="outline"
      icon={Layers2}
      className="flex w-full gap-4"
      onClick={handleCreateLayer}
    >
      Create Layer
    </Button>
  );
};
