'use client';

import { Layers } from '@/features/editor/component/layers/layers';
import { ToolSidebar } from '@/features/editor/component/tool-sidebar';
import { ImageView } from '@/features/editor/view/image-view';

export const Editor = () => {
  return (
    <div className="grid h-full grid-cols-[240px_1fr_360px]">
      <ToolSidebar />
      <ImageView />
      <Layers />
    </div>
  );
};
