export const site = {
  name: 'Umut Yıldız',
  brand: 'UMUT YILDIZ',
  title: 'Software Engineer',
  tagline:
    'Building intelligent solutions at the intersection of AI, IoT, and healthcare.',
  description:
    'Portfolio of Umut Yıldız — software engineer exploring AI and IoT innovations in healthcare.',
  email: 'umutyldz2626@gmail.com',
  location: 'Turkey',
  phone: '',
  social: {
    github: 'https://github.com/Peacefulcatt',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
} as const;

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;
