import { BgRemove } from '@/features/tools/image-tools/bg-remove';
import { BgReplace } from '@/features/tools/image-tools/bg-replace';
import { GenRemove } from '@/features/tools/image-tools/gen-remove';

export const Tools = () => (
  <>
    <div className="flex flex-col gap-4 p-4">
      <div className="hidden flex-col text-left md:flex">
        <h2 className="text-lg font-semibold tracking-tight">Image tools</h2>
        <p className="text-xs text-muted-foreground">
          Tools to help you edit your image with help of AI.
        </p>
      </div>
      <GenRemove />
      <BgRemove />
      <BgReplace />
    </div>
  </>
);
