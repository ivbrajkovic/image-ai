import { AppShell } from '@/components/app-shell/app-shell';
import { Header } from '@/components/header/header';
import { Editor } from '@/features/editor/editor';
import { Layers } from '@/features/layers/layers';
import { Tools } from '@/features/tools/tools';
import { StoreProvider } from '@/store/store-provider';
import { getLayers } from '@/supabase/queries/get-laysers';

export default async function Home() {
  const layers = await getLayers();

  return (
    <StoreProvider>
      <AppShell
        header={<Header />}
        leftSidebar={<Tools />}
        rightSidebar={<Layers layers={layers} />}
      >
        <Editor />
      </AppShell>
    </StoreProvider>
  );
}
