'use client';

import { Editor } from '@/features/editor/editor';
import { StoreProvider } from '@/features/editor/store/store-provider';

export default function Home() {
  return (
    <StoreProvider>
      <main className="h-full">
        <Editor />
      </main>
    </StoreProvider>
  );
}
