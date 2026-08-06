export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Healthcare AI Platform',
    description:
      'AI-powered diagnostic support for medical professionals with high-accuracy image analysis.',
    tags: ['React', 'Python', 'TensorFlow'],
    github: 'https://github.com/Peacefulcatt',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'E-Commerce Dashboard',
    description:
      'Real-time analytics dashboard for e-commerce teams with clear data visualization.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Peacefulcatt',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'IoT Smart Home System',
    description:
      'Cross-platform mobile app for controlling IoT home automation devices.',
    tags: ['React Native', 'Firebase', 'IoT'],
    github: 'https://github.com/Peacefulcatt',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description:
      'Responsive personal portfolio rebuilt with Astro for speed and clarity.',
    tags: ['Astro', 'CSS', 'TypeScript'],
    github: 'https://github.com/Peacefulcatt/react_portfolio',
    demo: '#',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  },
];
