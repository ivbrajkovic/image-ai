import { createClient } from '@/supabase/server';

export const getLayers = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('layers').select('*');
  const layers = data ?? [];
  return layers;
};
