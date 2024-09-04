'use client';

import { useDropzone } from 'react-dropzone';

export const UploadImage = () => {
  const {} = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop: async (acceptedFiles, fileRejection) => {
      if (fileRejection.length) {
        console.log('fileRejection', fileRejection);

        const formData = new FormData();
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        // const blob = await fetch(objectUrl).then((res) => res.blob());
        formData.append('image', acceptedFiles[0]);

        // const res = await
      }
    },
  });

  return <div>upload-image</div>;
};
