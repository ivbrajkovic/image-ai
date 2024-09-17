'use client';

import { AppShell } from '@/components/app-shell/app-shell';
import { Header } from '@/components/header/header';
import { Editor } from '@/features/editor/editor';
import { Layers } from '@/features/layers/layers';
import { Tools } from '@/features/tools/tools';
import { StoreProvider } from '@/store/store-provider';

export default function Home() {
  return (
    <StoreProvider>
      <AppShell
        header={<Header />}
        leftSidebar={<Tools />}
        rightSidebar={<Layers />}
      >
        <Editor />
      </AppShell>
    </StoreProvider>
  );
}
