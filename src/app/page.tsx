'use client';

import { AppShell } from '@/components/app-shell/app-shell';
import { Editor } from '@/components/editor/editor';
import { Header } from '@/components/header/header';
import { LayersSidebar } from '@/components/layers-sidebar/layers-sidebar';
import { ToolsSidebar } from '@/components/tools-sidebar/tools-sidebar';
import { StoreProvider } from '@/store/store-provider';

export default function Home() {
  
  return (
    <StoreProvider>
      <AppShell
        header={<Header />}
        leftSidebar={<ToolsSidebar />}
        rightSidebar={<LayersSidebar />}
      >
        <Editor />
      </AppShell>
    </StoreProvider>
  );
}
