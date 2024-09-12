'use client';

import { Editor } from '@/components/editor/editor';
import { LayersSidebar } from '@/components/layers-sidebar/layers-sidebar';
import { ToolsSidebar } from '@/components/tools-sidebar/tools-sidebar';
import { StoreProvider } from '@/store/store-provider';

export default function Home() {
  return (
    <StoreProvider>
      <main className="grid h-full grid-cols-[240px_1fr_360px]">
        <ToolsSidebar />
        <Editor />
        <LayersSidebar />
      </main>
    </StoreProvider>
  );
}
