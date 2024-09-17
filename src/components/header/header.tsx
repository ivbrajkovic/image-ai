import { Layers, Paintbrush } from 'lucide-react';

import { LayersSidebar } from '@/components/layers-sidebar/layers-sidebar';
import { ToolsSidebar } from '@/components/tools-sidebar/tools-sidebar';
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
            <ToolsSidebar />
          </SheetContent>
        </Sheet>
      ) : null}

      <div className="flex-1"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-lg">Image AI</h1>
      </div>

      <ModeToggle />
      <LogoutButton />

      {!isDesktop ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Layers className="size-5" />
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
            <LayersSidebar />
          </SheetContent>
        </Sheet>
      ) : null}
    </div>
  );
};
