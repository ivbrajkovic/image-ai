import Image from 'next/image';

import { ImageStore } from '@/features/editor/store/image-store';
import { Layer, LayersStore } from '@/features/editor/store/layers-store';
import { cn } from '@/lib/utils';

type ActiveImageProps = Layer & {
  generating: boolean;
};

const ActiveLayer = (props: ActiveImageProps) => (
  <div>
    {props.resourceType === 'image' ? (
      <Image
        fill
        src={props.url!}
        alt={props.name!}
        className={cn(
          'rounded-lg object-contain',
          props.generating ? 'animate-pulse' : '',
        )}
      />
    ) : props.resourceType === 'video' ? (
      <video
        controls
        width={props.width}
        height={props.height}
        className="max-h-full max-w-full rounded-lg object-contain"
        src={props.transcriptionUrl ?? props.url}
      />
    ) : null}
  </div>
);

export const ActiveImage = () => {
  const generating = ImageStore.useStore((state) => state.generating);
  const layers = LayersStore.useStore((state) => state.layers);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  if (!activeLayer.url) return null;

  return (
    <div className="relative flex h-svh w-full flex-col items-center justify-center bg-secondary p-24">
      <ActiveLayer {...activeLayer} generating={generating} />
    </div>
  );
};
