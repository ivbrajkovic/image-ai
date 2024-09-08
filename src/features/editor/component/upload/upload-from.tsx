import { useState } from 'react';

import { UploadImage } from '@/features/editor/component/upload/upload-image';

type FormType = 'image' | 'video';

export const UploadFrom = () => {
  const [formType, setFormType] = useState<FormType>('image');

  if (formType == 'image') return <UploadImage />;
  return <div>Video upload</div>;
};
