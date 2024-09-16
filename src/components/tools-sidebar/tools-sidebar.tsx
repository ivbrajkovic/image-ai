import { BgRemove } from '@/components/tools-sidebar/image-tools/bg-remove';
import { BgReplace } from '@/components/tools-sidebar/image-tools/bg-replace';
import { GenRemove } from '@/components/tools-sidebar/image-tools/gen-remove';
import { ModeToggle } from '@/theme/mode-toggle';

export const ToolsSidebar = () => {
  return (
    <>
      <div className="pb-2 text-center md:pb-4">
        <ModeToggle />
      </div>
      <GenRemove />
      <BgRemove />
      <BgReplace />
    </>
  );
};
