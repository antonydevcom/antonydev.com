// Centralized location + brand config.
// To migrate cities: update LOCATION values here only — all schemas, metadata,
// and copy that import from this file will reflect the new city automatically.

export const LOCATION = {
  city: 'Zihuatanejo',
  city2: 'Ixtapa',
  state: 'Guerrero',
  country: 'México',
  countryCode: 'MX' as const,
  postalCode: '40880',
  lat: 17.6414,
  lng: -101.5497,
  phone: '+52 755 127 5901',
  phoneIntl: '+527551275901',
  email: 'hola@antonydev.com',
  timezone: 'America/Mexico_City',
  areaServed: ['Zihuatanejo', 'Ixtapa', 'Petatlán', 'La Unión', 'Guerrero', 'México'],
} as const;

export const BRAND = {
  name: 'AntonyDev',
  legalName: 'Antonio Valdovinos',
  alternateName: 'Antony Valdovinos',
  jobTitle: 'Desarrollador Web Fullstack',
  siteUrl: 'https://antonydev.com',
  description: `Desarrollo web, identidad digital y automatización para negocios en ${LOCATION.city} e ${LOCATION.city2}. Fundado por Antonio Valdovinos.`,
  knowsAbout: [
    'Desarrollo Web',
    'SEO Local',
    'Automatización Digital',
    'Identidad Digital',
    'Sistemas de Gestión',
    'Astro',
    'React',
    'Supabase',
    'MercadoPago',
    'WhatsApp Business API',
  ],
  sameAs: [
    'https://github.com/antonydevcom',
    'https://linkedin.com/in/antony-valdovinos',
  ],
} as const;
