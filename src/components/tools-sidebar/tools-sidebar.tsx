import { BgRemove } from '@/components/tools-sidebar/image-tools/bg-remove';
import { BgReplace } from '@/components/tools-sidebar/image-tools/bg-replace';
import { GenRemove } from '@/components/tools-sidebar/image-tools/gen-remove';
import { ModeToggle } from '@/theme/mode-toggle';

export const ToolsSidebar = () => {
  return (
    <div className="px-4 py-6">
      <div className="pb-12 text-center">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4">
        <GenRemove />
        <BgRemove />
        <BgReplace />
      </div>
    </div>
  );
};
