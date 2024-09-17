'usw client';

import Image from 'next/image';

import { Layer } from '@/store/layers-store';

type LayerImageProps = Pick<Layer, 'url' | 'name' | 'format'>;

export const LayerImage = ({ url, name, format }: LayerImageProps) => {
  if (!url || !name) return null;

  const formatText = `${name.slice(0, 15)}.${format}`;

  return (
    <div className="flex items-center gap-4">
      <Image
        src={url}
        alt={name}
        width={36}
        height={36}
        className="rounded-sm object-contain"
      />
      <div>
        <p className="text-sm">{formatText}</p>
      </div>
    </div>
  );
};
