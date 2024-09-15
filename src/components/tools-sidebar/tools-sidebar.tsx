import { ImageTools } from '@/components/tools-sidebar/image-tools';
import { ModeToggle } from '@/theme/mode-toggle';

export const ToolsSidebar = () => {
  return (
    <div className="px-4 py-6">
      <div className="pb-12 text-center">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4">
        <ImageTools />
      </div>
    </div>
  );
};
