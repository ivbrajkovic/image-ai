'use client';

import { Layers, Menu, Paintbrush } from 'lucide-react';

import { Editor } from '@/components/editor/editor';
import { LayersSidebar } from '@/components/layers-sidebar/layers-sidebar';
import { ToolsSidebar } from '@/components/tools-sidebar/tools-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { StoreProvider } from '@/store/store-provider';

export default function Home() {
  return (
    <StoreProvider>
      <>
        <header className="flex h-14 w-full place-content-between items-center px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Paintbrush className="size-5" />
                <span className="sr-only">Toggle image tools</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <ToolsSidebar />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Layers className="size-5" />
                <span className="sr-only">Toggle layers</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex h-full flex-col p-0 pt-10"
            >
              <LayersSidebar />
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid h-screen md:grid-cols-[240px_1fr_320px]">
          <div className="hidden flex-col gap-4 px-4 py-6 md:flex">
            <ToolsSidebar />
          </div>
          <Editor />
          <div className="hidden h-full md:block">
            <LayersSidebar />
          </div>
        </main>
      </>
    </StoreProvider>
  );
}
