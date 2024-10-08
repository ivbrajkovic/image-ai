import { Images } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const ComparisonButton = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const comparisonMode = LayersStore.useStore((state) => state.comparisonMode);

  const setComparedLayers = LayersStore.useStore(
    (state) => state.setComparedLayers,
  );

  const handleClick = () =>
    comparisonMode
      ? setComparedLayers([])
      : activeLayer
        ? setComparedLayers([activeLayer])
        : null;

  return (
    <Button
      variant={comparisonMode ? 'destructive' : 'outline'}
      disabled={!activeLayer?.url || generating}
      icon={Images}
      className="flex w-full gap-4"
      onClick={handleClick}
    >
      {comparisonMode ? 'Cancel Comparison' : 'Compare Layers'}
    </Button>
  );
};
