'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { uploadImageAction } from '@/server/upload-image-action';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadImage = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop: async (acceptedFiles, fileRejection) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        // const blob = await fetch(objectUrl).then((res) => res.blob());
        formData.append('image', acceptedFiles[0]);

        const res = await uploadImageAction({ formData });
        console.log('res', res);
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out ',
        `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`,
      )}
    >
      <CardContent className='flex flex-col h-full items-center justify-center px-2 py-24 text-xs'>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center gap-4'>
          <h1>Cool animation</h1>
          <p className='text-muted-foreground text-2xl'>
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag and drop some files here, or click to select files'}
          </p>
          <p className='text-muted-foreground'>
            Supported formats: png, jpg, jpeg, gif, webp
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
