import { LayersStore } from '@/components/layers-sidebar/layers-store';
import { ImageTools } from '@/components/tools-sidebar/image-tools';
import { ModeToggle } from '@/theme/mode-toggle';

const Tools = () => {
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  if (activeLayer.resourceType === 'image') return <ImageTools />;
  if (activeLayer.resourceType === 'video') return null;
  return null;
};

export const ToolsSidebar = () => {
  return (
    <div className="px-4 py-6">
      <div className="pb-12 text-center">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4">
        <Tools />
      </div>
    </div>
  );
};
