'use client';

import { Loader2, LogOut } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/features/auth/logout/logout-action';

export const LogoutButton = () => {
  const { execute, isExecuting } = useAction(logoutAction, {
    onError: (error) => {
      // TODO: Show toast notification with error message
      console.error('Error logging out', error);
    },
  });

  return (
    <Button size="icon" variant="outline" onClick={execute.bind(null, void 0)}>
      {isExecuting ? (
        <Loader2 className="size-[1.2rem] animate-spin" />
      ) : (
        <LogOut className="size-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
