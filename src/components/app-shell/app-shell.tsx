import { PropsWithChildren } from 'react';

import { useBreakpoint } from '@/hooks/tailwind';

type AppShellProps = PropsWithChildren<{
  header: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
}>;

export const AppShell = (props: AppShellProps) => {
  const isDesktop = useBreakpoint('md', true);

  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <header className="flex h-14 w-full items-center border-b px-4">
        {props.header}
      </header>
      <main className="grid md:grid-cols-[240px_1fr_320px]">
        {isDesktop ? props.leftSidebar : null}
        {props.children}
        {isDesktop ? props.rightSidebar : null}
      </main>
    </div>
  );
};
