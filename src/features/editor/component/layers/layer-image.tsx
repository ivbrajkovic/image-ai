'usw client';

import Image from 'next/image';

import { Layer } from '@/features/editor/store/layers-store';

type LayerImageProps = Pick<Layer, 'url' | 'name' | 'format' | 'poster'>;

export const LayerImage = ({ url, name, format, poster }: LayerImageProps) => {
  if (!url || !name) return null;

  const isVideo = format === 'mp4';
  const imageSrc = isVideo ? poster || url : url; // isVideo && poster || url
  const formatText = `${name.slice(0, 15)}.${format}`;

  return (
    <div className="flex size-12 items-center gap-2">
      <Image
        src={imageSrc}
        alt={name}
        width={50}
        height={50}
        className="size-full rounded-sm object-contain"
      />
      <div>
        <p className="text-sm">{formatText}</p>
      </div>
    </div>
  );
};
