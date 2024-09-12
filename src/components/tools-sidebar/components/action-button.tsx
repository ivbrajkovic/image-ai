import {
  ButtonLoading,
  ButtonLoadingProps,
} from '@/components/ui/button-loading';
import { ImageStore } from '@/store/image-store';

type ActionButtonProps = ButtonLoadingProps;

export const ActionButton = (props: ActionButtonProps) => {
  const generating = ImageStore.useStore((state) => state.generating);
  return (
    <ButtonLoading isLoading={generating} className="mt-4 w-full" {...props} />
  );
};
