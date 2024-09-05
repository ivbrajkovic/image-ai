import { ModeToggle } from '@/components/mode-toggle';
import { Editor } from '@/features/editor/editor';

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <Editor />
    </main>
  );
}
