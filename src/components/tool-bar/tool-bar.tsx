import { ImageTools } from '@/components/tool-bar/image-tools';
import { ModeToggle } from '@/theme/mode-toggle';

export const ToolBar = () => {
  return (
    <div className="px-4 py-6">
      <div className="pb-12 text-center">
        <ModeToggle />
      </div>
      <div>
        <ImageTools />
      </div>
    </div>
  );
};
