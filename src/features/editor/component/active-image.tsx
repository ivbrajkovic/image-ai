import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ImageStore } from '@/store/image-store';
import { LayersStore } from '@/store/layers-store';

export const ActiveImage = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  if (!activeLayer) return <div>No active layer selected.</div>;

  return (
    <div className="h-full bg-secondary p-0 md:p-16">
      <div className="relative flex size-full items-center justify-center">
        <Image
          fill
          src={activeLayer.url ?? ''}
          alt={activeLayer.name ?? ''}
          className={cn(
            'rounded-lg object-contain',
            generating ? 'animate-pulse' : '',
          )}
        />
      </div>
    </div>
  );
};
