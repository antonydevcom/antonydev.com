import type { APIRoute } from 'astro';

export const prerender = false;
import { Resend } from 'resend';
import { z } from 'zod';

const rateLimitMap = new Map<string, number[]>();

const ContactSchema = z.object({
  nombre:   z.string().min(2).max(100),
  whatsapp: z.string().min(8).max(20),
  negocio:  z.string().min(2).max(200),
  email:    z.string().email().optional().or(z.literal('')),
  mensaje:  z.string().min(10).max(2000),
  website:  z.string().max(0), // honeypot — bots fill it, humans don't
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const now = Date.now();
  const ip = clientAddress ?? 'unknown';
  const hits = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < 3_600_000);

  if (hits.length >= 5) {
    return new Response(JSON.stringify({ error: 'Demasiados intentos. Intenta en una hora.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  rateLimitMap.set(ip, [...hits, now]);

  const body = await request.json().catch(() => null);
  if (!body) {
    return new Response(JSON.stringify({ error: 'Datos inválidos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify({ error: 'Por favor completa todos los campos requeridos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { nombre, whatsapp, negocio, email, mensaje } = result.data;

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'notificaciones@antonydev.com',
        to:   'hola@antonydev.com',
        subject: `Nuevo contacto: ${nombre} — ${negocio}`,
        text: [
          `Nombre:    ${nombre}`,
          `WhatsApp:  ${whatsapp}`,
          `Negocio:   ${negocio}`,
          `Email:     ${email || 'N/A'}`,
          ``,
          `Mensaje:`,
          mensaje,
        ].join('\n'),
      });
    } catch {
      // Log but don't fail the request — contact still recorded
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
