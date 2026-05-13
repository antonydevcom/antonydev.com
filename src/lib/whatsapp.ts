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
  hero:           'Hola Antony, vi tu página y me interesa saber cómo puedes ayudar a mi negocio.',
  servicios:      'Hola Antony, vi tus servicios en antonydev.com y me gustaría cotizar.',
  auditoria:      'Hola Antony, me interesa la auditoría digital gratuita para mi negocio.',
  creacion:       'Hola Antony, me interesa crear un sitio web o sistema para mi negocio.',
  mantenimiento:  'Hola Antony, me interesa el plan de mantenimiento mensual.',
  identidad:      'Hola Antony, me interesa trabajar la identidad digital de mi negocio.',
  automatizacion: 'Hola Antony, me interesa automatizar procesos de mi negocio con WhatsApp o pagos en línea.',
  cotizador:      'Hola Antony, acabo de llenar el cotizador y tengo preguntas.',
  contacto:       'Hola Antony, vi tu página y me gustaría cotizar un proyecto.',
  footer:         'Hola Antony, vi tu página antonydev.com y quiero platicar.',
};

export function getWhatsAppLink(ctx: ContactContext = 'hero'): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '527551275901';
  return `https://wa.me/${number}?text=${encodeURIComponent(MESSAGES[ctx])}`;
}
