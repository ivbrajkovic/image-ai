import { BgRemove } from '@/components/tools-sidebar/image-tools/bg-remove';
import { BgReplace } from '@/components/tools-sidebar/image-tools/bg-replace';
import { GenRemove } from '@/components/tools-sidebar/image-tools/gen-remove';

export const ImageTools = () => {
  return (
    <>
      <GenRemove />
      <BgRemove />
      <BgReplace />
    </>
  );
};
