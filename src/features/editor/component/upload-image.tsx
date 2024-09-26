'use client';

import { useAction } from 'next-safe-action/hooks';
import { useDropzone } from 'react-dropzone';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { updateLayerAction } from '@/server/update-layer-action';
import { uploadImageAction } from '@/server/upload-image-action';
import { ImageStore } from '@/store/image-store';
import { Layer, LayersStore } from '@/store/layers-store';

export const UploadImage = () => {
  const updateLayer = useAction(updateLayerAction);
  const setGenerating = ImageStore.useStore((state) => state.setGenerating);
  const activeLayer = LayersStore.useStore((state) => state.activeLayer);
  const setActiveLayer = LayersStore.useStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length || !activeLayer) return;
      setGenerating(true);

      const url = URL.createObjectURL(acceptedFiles[0]);
      const uploadingLayer: Layer = { ...activeLayer, url, name: 'Uploading' };
      updateLayer.execute(uploadingLayer);
      setActiveLayer(uploadingLayer);

      const formData = new FormData(); // Server actions require FormData
      formData.append('image', acceptedFiles[0]);

      const res = await uploadImageAction(formData);
      const { serverError, validationErrors, data } = res ?? {};

      if (serverError) console.error(serverError);
      else if (validationErrors) console.error(validationErrors);
      else if (data) {
        const newActiveLayer: Layer = {
          ...activeLayer,
          name: data.original_filename,
          url: data.url,
          width: data.width,
          height: data.height,
          format: data.format,
          public_id: data.public_id,
        };
        updateLayer.execute(newActiveLayer);
        setActiveLayer(newActiveLayer);
      }

      setGenerating(false);
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'hover:border-primary2 transition-all ease-in-out hover:cursor-pointer hover:bg-secondary',
        `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`,
      )}
    >
      <CardContent className="flex h-full flex-col items-center justify-center px-2 py-24 text-xs">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="hidden text-2xl text-muted-foreground md:block">
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag and drop some files here, or click to select files'}
          </p>
          <p className="text-center text-lg text-muted-foreground md:hidden">
            Tap to select files from your device
          </p>
          <p className="text-muted-foreground">
            Supported formats: png, jpg, jpeg, webp
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
