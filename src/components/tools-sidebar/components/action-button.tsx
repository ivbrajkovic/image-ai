import { Button, ButtonProps } from '@/components/ui/button';
import { ImageStore } from '@/store/image-store';

type ActionButtonProps = ButtonProps;

export const ActionButton = (props: ActionButtonProps) => {
  const generating = ImageStore.useStore((state) => state.generating);
  return <Button isLoading={generating} className="mt-4 w-full" {...props} />;
};
