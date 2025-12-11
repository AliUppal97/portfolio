// Internationalization Configuration
// This provides a foundation for multi-language support

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr', 'de', 'ja', 'zh'],
  localeDetection: true,
} as const

export type Locale = (typeof i18nConfig)['locales'][number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  ja: '🇯🇵',
  zh: '🇨🇳',
}

// Translation keys type
export interface TranslationKeys {
  // Navigation
  'nav.home': string
  'nav.about': string
  'nav.experience': string
  'nav.projects': string
  'nav.skills': string
  'nav.certifications': string
  'nav.testimonials': string
  'nav.blog': string
  'nav.contact': string
  
  // Hero
  'hero.badge': string
  'hero.title.line1': string
  'hero.title.line2': string
  'hero.title.line3': string
  'hero.description': string
  'hero.cta.projects': string
  'hero.cta.contact': string
  
  // About
  'about.title': string
  'about.subtitle': string
  
  // Experience
  'experience.title': string
  'experience.subtitle': string
  'experience.caseStudy': string
  
  // Projects
  'projects.title': string
  'projects.subtitle': string
  'projects.viewAll': string
  'projects.caseStudy': string
  
  // Contact
  'contact.title': string
  'contact.subtitle': string
  'contact.form.name': string
  'contact.form.email': string
  'contact.form.company': string
  'contact.form.website': string
  'contact.form.message': string
  'contact.form.submit': string
  'contact.form.success': string
  'contact.form.error': string
  
  // Footer
  'footer.copyright': string
  'footer.madeWith': string
  
  // Common
  'common.loading': string
  'common.error': string
  'common.retry': string
  'common.learnMore': string
  'common.viewAll': string
  'common.download': string
}

// Default English translations
export const translations: Record<Locale, TranslationKeys> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.certifications': 'Certifications',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    'hero.badge': 'Senior Software Engineer',
    'hero.title.line1': 'Building',
    'hero.title.line2': 'Enterprise-Grade',
    'hero.title.line3': 'Experiences',
    'hero.description': '7+ years architecting scalable solutions across fintech, healthcare, and SaaS.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': "Let's Talk",
    
    'about.title': 'About Me',
    'about.subtitle': 'Get to know my background and expertise',
    
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'A proven track record of delivering enterprise-grade solutions',
    'experience.caseStudy': 'Case Study',
    
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Enterprise-grade solutions with measurable business impact',
    'projects.viewAll': 'View All Projects',
    'projects.caseStudy': 'View Case Study',
    
    'contact.title': "Let's Build Something Amazing",
    'contact.subtitle': 'Ready to transform your vision into reality?',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.website': 'Website',
    'contact.form.message': 'Project Details',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Something went wrong. Please try again.',
    
    'footer.copyright': '© {year} Senior Software Engineer. All rights reserved.',
    'footer.madeWith': 'Made with',
    
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try Again',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.download': 'Download',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.certifications': 'Certificaciones',
    'nav.testimonials': 'Testimonios',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    
    'hero.badge': 'Ingeniero de Software Senior',
    'hero.title.line1': 'Construyendo',
    'hero.title.line2': 'Experiencias',
    'hero.title.line3': 'Empresariales',
    'hero.description': '7+ años diseñando soluciones escalables en fintech, salud y SaaS.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.contact': 'Hablemos',
    
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Conoce mi trayectoria y experiencia',
    
    'experience.title': 'Experiencia Profesional',
    'experience.subtitle': 'Un historial comprobado de entrega de soluciones empresariales',
    'experience.caseStudy': 'Caso de Estudio',
    
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Soluciones empresariales con impacto medible',
    'projects.viewAll': 'Ver Todos los Proyectos',
    'projects.caseStudy': 'Ver Caso de Estudio',
    
    'contact.title': 'Construyamos Algo Increíble',
    'contact.subtitle': '¿Listo para transformar tu visión en realidad?',
    'contact.form.name': 'Nombre Completo',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.company': 'Empresa',
    'contact.form.website': 'Sitio Web',
    'contact.form.message': 'Detalles del Proyecto',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.form.error': 'Algo salió mal. Por favor intenta de nuevo.',
    
    'footer.copyright': '© {year} Ingeniero de Software Senior. Todos los derechos reservados.',
    'footer.madeWith': 'Hecho con',
    
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.retry': 'Intentar de Nuevo',
    'common.learnMore': 'Saber Más',
    'common.viewAll': 'Ver Todo',
    'common.download': 'Descargar',
  },
  // Add more languages as needed...
  fr: {} as TranslationKeys,
  de: {} as TranslationKeys,
  ja: {} as TranslationKeys,
  zh: {} as TranslationKeys,
}

// Helper function to get translation
export function t(key: keyof TranslationKeys, locale: Locale = 'en', params?: Record<string, string | number>): string {
  let translation = translations[locale][key] || translations.en[key] || key
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{${param}}`, String(value))
    })
  }
  
  return translation
}


