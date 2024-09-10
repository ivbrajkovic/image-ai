'use client';

import { Editor } from '@/components/editor/editor';
import { LayersBar } from '@/components/layers-bar/layers-bar';
import { ToolBar } from '@/components/tool-bar/tool-bar';
import { StoreProvider } from '@/store/store-provider';

export default function Home() {
  return (
    <StoreProvider>
      <main className="grid h-full grid-cols-[240px_1fr_360px]">
        <ToolBar />
        <Editor />
        <LayersBar />
      </main>
    </StoreProvider>
  );
}
