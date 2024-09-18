import { createClient } from '@/utils/supabase/server';

export const checkUser = async () => {
  const {
    data: { user },
    error,
  } = await createClient().auth.getUser();

  if (error || !user) throw new Error('Error fetching user session');

  return user;
};
