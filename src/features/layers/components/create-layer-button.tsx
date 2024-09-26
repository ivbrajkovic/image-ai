import { Layers2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { createLayerAction } from '@/server/create-layer-action';

export const CreateLayerButton = () => {
  const action = useAction(createLayerAction);

  return (
    <Button
      isLoading={action.isExecuting}
      variant="outline"
      icon={Layers2}
      className="flex w-full gap-4"
      onClick={action.execute.bind(null, {})}
    >
      Create Layer
    </Button>
  );
};
