'use client';

import { useDropzone } from 'react-dropzone';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { uploadImageAction } from '@/server/upload-image-action';

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
    // {...getRootProps()}
    // className={cn(
    //   'transition-all ease-in-out hover:cursor-pointer hover:border-primary hover:bg-secondary',
    //   `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`,
    // )}
    >
      <div className="py-10">
        {/* <input {...getInputProps()} /> */}
        <h1>Card Content</h1>
        {/* <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl text-muted-foreground">
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag and drop some files here, or click to select files'}
          </p>
          <p className="text-muted-foreground">
            Supported formats: png, jpg, jpeg, gif, webp
          </p>
        </div> */}
      </div>
    </Card>
  );
};
