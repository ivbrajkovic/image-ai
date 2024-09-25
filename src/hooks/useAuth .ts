import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { createClient } from '@/supabase/client';

const useAuth = () => {
  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user }, error }) => {
        if (error || !user) {
          // Redirect to login if user is not authenticated
          redirect('/login');
        }
      });
  }, []);
};

export default useAuth;
