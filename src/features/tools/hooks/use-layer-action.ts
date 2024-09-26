import { useAction } from 'next-safe-action/hooks';

import { useToast } from '@/hooks/use-toast';
import { createLayerAction } from '@/server/create-layer-action';
import {
  BgRemoveProps,
  bgReplaceProps,
  CartoonifyProps,
  GenRemoveProps,
} from '@/services/cloudinary/validations';
import { ImageStore } from '@/store/image-store';
import { Layer, LayersStore } from '@/store/layers-store';
import { ensureValue } from '@/utils/get-or-throw';
import { incrementFilenameNumber } from '@/utils/increment-filename-number';

type ResponseType =
  | { data?: { url?: string }; serverError?: string }
  | undefined;

type ActionOptions = {
  imageFormat?: string;
  errorMessageTitle: string;
  errorMessageDescription?: string;
};

type PerformActionParams =
  | GenRemoveProps
  | BgRemoveProps
  | bgReplaceProps
  | CartoonifyProps;

export function useLayerAction() {
  const { toast } = useToast();
  const createLayer = useAction(createLayerAction);

  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const handleActionError = (title: string) => (error: unknown) => {
    const description =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An error occurred';
    toast({
      variant: 'destructive',
      title,
      description,
    });
  };

  const performAction = <
    TParams extends PerformActionParams,
    TResponse extends ResponseType,
  >(props: {
    action: (params: TParams) => Promise<TResponse>;
    params?: Omit<TParams, 'url' | 'format'>;
    options: ActionOptions;
  }) => {
    const getParams = () => {
      const url = ensureValue(activeLayer?.url, 'No active layer URL.');
      const format = ensureValue(
        activeLayer?.format,
        'No active layer format.',
      );
      return { ...props.params, url, format } as TParams;
    };

    return Promise.resolve()
      .then(setGenerating.bind(null, true))
      .then(getParams)
      .then(props.action)
      .then<Partial<Layer>>((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        const newUrl = ensureValue(data?.url, 'No image URL received');
        const newName = incrementFilenameNumber(activeLayer?.name);
        return {
          public_id: activeLayer?.public_id,
          url: newUrl,
          name: newName,
          format: props.options.imageFormat || activeLayer?.format,
          width: activeLayer?.width,
          height: activeLayer?.height,
        };
      })
      .then(createLayer.executeAsync)
      .then((response) => {
        const { data, serverError } = response ?? {};
        if (serverError) throw new Error(serverError);
        const layer = ensureValue(data?.[0], 'No layer data received');
        setActiveLayer(layer);
      })
      .catch(handleActionError(props.options.errorMessageTitle))
      .finally(() => setGenerating(false));
  };

  return { activeLayer, performAction };
}
