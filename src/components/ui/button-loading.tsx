import { Loader2 } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

type ButtonLoadingProps = PropsWithChildren<
  ButtonProps & {
    isLoading?: boolean;
  }
>;

export const ButtonLoading = ({
  isLoading,
  children,
  ...other
}: ButtonLoadingProps) => {
  return (
    <Button {...other} disabled={isLoading}>
      {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
      {children}
    </Button>
  );
};
