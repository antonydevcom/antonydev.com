type ContactContext =
  | 'hero'
  | 'servicios'
  | 'auditoria'
  | 'creacion'
  | 'mantenimiento'
  | 'identidad'
  | 'automatizacion'
  | 'cotizador'
  | 'contacto'
  | 'footer';

const MESSAGES: Record<ContactContext, string> = {
  hero:           'Hola Antonio, vi tu página y me interesa saber cómo puedes ayudar a mi negocio.',
  servicios:      'Hola Antonio, vi tus servicios en antonydev.com y me gustaría cotizar.',
  auditoria:      'Hola Antonio, me interesa la auditoría digital gratuita para mi negocio.',
  creacion:       'Hola Antonio, me interesa crear un sitio web o sistema para mi negocio.',
  mantenimiento:  'Hola Antonio, me interesa el plan de mantenimiento mensual.',
  identidad:      'Hola Antonio, me interesa trabajar la identidad digital de mi negocio.',
  automatizacion: 'Hola Antonio, me interesa automatizar procesos de mi negocio con WhatsApp o pagos en línea.',
  cotizador:      'Hola Antonio, acabo de llenar el cotizador y tengo preguntas.',
  contacto:       'Hola Antonio, vi tu página y me gustaría cotizar un proyecto.',
  footer:         'Hola Antonio, vi tu página antonydev.com y quiero platicar.',
};

export function getWhatsAppLink(ctx: ContactContext = 'hero'): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '527551275901';
  return `https://wa.me/${number}?text=${encodeURIComponent(MESSAGES[ctx])}`;
}
