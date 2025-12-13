import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Senior Software Engineer Portfolio',
    short_name: 'Portfolio',
    description: 'Portfolio of a Senior Software Engineer with 7+ years experience in enterprise full-stack development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#667eea',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Desktop view of portfolio',
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile view of portfolio',
      },
    ],
    categories: ['portfolio', 'business', 'productivity'],
    shortcuts: [
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View my projects',
        url: '/#projects',
        icons: [{ src: '/icons/projects-icon.png', sizes: '96x96' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch',
        url: '/#contact',
        icons: [{ src: '/icons/contact-icon.png', sizes: '96x96' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}






