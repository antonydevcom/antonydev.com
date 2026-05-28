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
  | 'footer'
  | 'sobre-mi'
  | 'portafolio'
  | 'desarrollo-web-zihuatanejo'
  | 'programador-zihuatanejo'
  | 'paginas-web-zihuatanejo'
  | 'desarrollo-web-ixtapa'
  | 'paginas-web-guerrero'
  | 'sistemas-gestion-zihuatanejo';

const MESSAGES: Record<ContactContext, string> = {
  hero:                          'Hola Antonio, vi tu página y me interesa saber cómo puedes ayudar a mi negocio.',
  servicios:                     'Hola Antonio, vi tus servicios en antonydev.com y me gustaría cotizar.',
  auditoria:                     'Hola Antonio, me interesa la auditoría digital gratuita para mi negocio.',
  creacion:                      'Hola Antonio, me interesa crear un sitio web o sistema para mi negocio.',
  mantenimiento:                 'Hola Antonio, me interesa el plan de mantenimiento mensual.',
  identidad:                     'Hola Antonio, me interesa trabajar la identidad digital de mi negocio.',
  automatizacion:                'Hola Antonio, me interesa automatizar procesos de mi negocio con WhatsApp o pagos en línea.',
  cotizador:                     'Hola Antonio, acabo de llenar el cotizador y tengo preguntas.',
  contacto:                      'Hola Antonio, vi tu página y me gustaría cotizar un proyecto.',
  footer:                        'Hola Antonio, vi tu página antonydev.com y quiero platicar.',
  'sobre-mi':                    'Hola Antonio, vi tu página y me gustaría saber más sobre tu trabajo.',
  'portafolio':                  'Hola Antonio, vi tu portafolio y me interesa contactarte.',
  'desarrollo-web-zihuatanejo':  'Hola Antonio, me interesa desarrollar un sitio web para mi negocio en Zihuatanejo.',
  'programador-zihuatanejo':     'Hola Antonio, necesito un programador para un proyecto en Zihuatanejo.',
  'paginas-web-zihuatanejo':     'Hola Antonio, me interesa una página web para mi negocio en Zihuatanejo.',
  'desarrollo-web-ixtapa':       'Hola Antonio, me interesa desarrollar un sitio web para mi negocio en Ixtapa.',
  'paginas-web-guerrero':        'Hola Antonio, me interesa una página web para mi negocio en Guerrero.',
  'sistemas-gestion-zihuatanejo': 'Hola Antonio, me interesa un sistema de gestión para mi negocio en Zihuatanejo.',
};

export function getWhatsAppLink(ctx: ContactContext = 'hero'): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '527551275901';
  return `https://wa.me/${number}?text=${encodeURIComponent(MESSAGES[ctx])}`;
}
