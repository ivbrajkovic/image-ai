import { Editor } from '@/components/editor/editor';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <Editor />
    </main>
  );
}
