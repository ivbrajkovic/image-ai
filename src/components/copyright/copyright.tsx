import { Github, Mail, CopyrightIcon } from 'lucide-react';

export const Copyright = () => {
  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-4 p-3 text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="flex">
          <span className="text-xs">2024</span>
          <CopyrightIcon size={8} className="self-start" />
        </div>
        <span className="whitespace-nowrap text-xs">Ivan Brajković</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/ivbrajkovic"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={14} />
        </a>
        <a
          href="mailto:ivan.brajkovic@icloud.com"
          target="_blank"
          rel="noreferrer"
        >
          <Mail size={14} />
        </a>
      </div>
    </div>
  );
};
