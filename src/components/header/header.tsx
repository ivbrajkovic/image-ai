'use client';

import { Layers as LayersIcon, Paintbrush } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogoutButton } from '@/features/auth/logout/logout-button';
import { Layers } from '@/features/layers/layers';
import { Tools } from '@/features/tools/tools';
import { useBreakpoint } from '@/hooks/tailwind';
import { ModeToggle } from '@/theme/mode-toggle';

export const Header = () => {
  const isDesktop = useBreakpoint('md', true);

  return (
    <div className="relative flex w-full items-center gap-2">
      {!isDesktop ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Paintbrush className="size-5" />
              <span className="sr-only">Toggle image tools</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-2 pt-4">
            <SheetHeader className="px-4">
              <SheetTitle>Image Tools</SheetTitle>
              <SheetDescription>
                Tools to help you edit your image with help of AI.
              </SheetDescription>
            </SheetHeader>
            <Tools />
          </SheetContent>
        </Sheet>
      ) : null}

      <ModeToggle />

      <div className="flex-1"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-lg">Image AI</h1>
      </div>

      <LogoutButton />

      {!isDesktop ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <LayersIcon className="size-5" />
              <span className="sr-only">Toggle layers</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex h-full flex-col p-2 pt-4">
            <SheetHeader className="px-4">
              <SheetTitle>Layers</SheetTitle>
              <SheetDescription>
                Layers to help you manage your image edits.
              </SheetDescription>
            </SheetHeader>
            <Layers />
          </SheetContent>
        </Sheet>
      ) : null}
    </div>
  );
};
