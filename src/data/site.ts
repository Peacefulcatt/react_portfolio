export const site = {
  name: 'Umut Yıldız',
  brand: 'UMUT YILDIZ',
  title: 'Software Engineer',
  tagline:
    'I build software for machines, small devices, and cloud-backed apps.',
  description:
    'Portfolio of Umut Yıldız, a software engineer working across devices, desktop tools, and cloud-backed apps.',
  email: 'umutyldz2626@gmail.com',
  location: 'Turkey',
  phone: '',
  social: {
    github: 'https://github.com/Peacefulcatt',
  },
} as const;

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;
