export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
};

/** Real projects only — placeholders removed. Add entries as you want them public. */
export const projects: Project[] = [];
