import { Loader2 } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

export type ButtonLoadingProps = PropsWithChildren<
  ButtonProps & {
    isLoading?: boolean;
  }
>;

export const ButtonLoading = ({
  isLoading,
  disabled,
  children,
  ...other
}: ButtonLoadingProps) => {
  return (
    <Button {...other} disabled={disabled || isLoading}>
      {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
      {children}
    </Button>
  );
};
