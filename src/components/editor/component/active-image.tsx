import Image from 'next/image';

import { Layer, LayersStore } from '@/components/layers-bar/layers-store';
import { cn } from '@/lib/utils';
import { ImageStore } from '@/store/image-store';

type ActiveImageProps = Layer & {
  generating: boolean;
};

const ActiveLayer = (props: ActiveImageProps) => (
  <div className="relative flex size-full items-center justify-center">
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
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);

  if (!activeLayer.url) return null;

  return (
    <div className="h-svh bg-secondary p-24">
      <ActiveLayer {...activeLayer} generating={generating} />
    </div>
  );
};
