import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const prerender = false;

// Serverless-safe rate limiting via Upstash Redis.
// Falls back gracefully (no rate limit) if env vars are absent — safe for local dev.
// 5 submissions per IP per 30-minute sliding window.
const ratelimit = (() => {
  const url   = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '30 m'),
    analytics: false,
  });
})();

const ContactSchema = z.object({
  nombre:   z.string()
    .min(1, 'Tu nombre es requerido.')
    .min(2, 'Tu nombre es demasiado corto.')
    .max(100, 'El nombre es demasiado largo.'),
  whatsapp: z.string()
    .min(1, 'Tu WhatsApp es requerido.')
    .min(8, 'Ingresa un WhatsApp válido.')
    .max(20, 'Número demasiado largo.'),
  negocio:  z.string()
    .min(1, 'El nombre de tu negocio es requerido.')
    .min(2, 'El nombre del negocio es demasiado corto.')
    .max(200, 'El nombre del negocio es demasiado largo.'),
  email:    z.string().email('Ingresa un correo válido.').optional().or(z.literal('')),
  mensaje:  z.string()
    .min(1, 'Por favor escribe tu mensaje.')
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(2000, 'El mensaje es demasiado largo (máx. 2000 caracteres).'),
  website:  z.string().max(0),
});

function trimStrings(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
  );
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function buildEmailHtml(params: {
  nombre:    string;
  whatsapp:  string;
  negocio:   string;
  email?:    string;
  mensaje:   string;
  timestamp: string;
  origin:    string;
}): string {
  const { nombre, whatsapp, negocio, email, mensaje, timestamp, origin } = params;

  const emailRow = email
    ? `<tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(42,32,27,0.08);">
          <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">Correo</p>
          <p style="margin:4px 0 0;font-size:15px;color:#2A201B;font-weight:500;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(email)}</p>
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>Nuevo contacto — AntonyDev</title>
</head>
<body style="margin:0;padding:0;background-color:#EEE8DF;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#EEE8DF;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr>
          <td style="background:#2A201B;padding:32px 36px;border-radius:12px 12px 0 0;">
            <p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">AntonyDev &middot; Nuevo contacto</p>
            <h1 style="margin:10px 0 0;font-size:22px;font-weight:600;color:#F7F4EE;line-height:1.3;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(nombre)}</h1>
            <p style="margin:5px 0 0;font-size:14px;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(negocio)}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#F7F4EE;padding:32px 36px;">

            <!-- Contact fields -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(42,32,27,0.08);">
                  <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">WhatsApp</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#2A201B;font-weight:500;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(whatsapp)}</p>
                </td>
              </tr>
              ${emailRow}
              <tr>
                <td style="padding:12px 0;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">Negocio</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#2A201B;font-weight:500;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(negocio)}</p>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">Mensaje</p>
            <div style="background:#EEE8DF;border-radius:8px;padding:20px 22px;border-left:3px solid #B7A79A;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#2A201B;white-space:pre-wrap;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(mensaje)}</p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#EEE8DF;padding:18px 36px;border-radius:0 0 12px 12px;border-top:1px solid rgba(42,32,27,0.1);">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:12px;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">${htmlEscape(timestamp)}</p>
                  <p style="margin:3px 0 0;font-size:12px;color:#B7A79A;font-family:Helvetica,Arial,sans-serif;">Origen: ${htmlEscape(origin)}</p>
                </td>
                <td align="right" valign="middle">
                  <p style="margin:0;font-size:12px;color:#B7A79A;font-weight:600;font-family:Helvetica,Arial,sans-serif;letter-spacing:0.05em;">antonydev.com</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit — enforced via Upstash Redis (serverless-safe, sliding window)
  // Skipped in local dev when env vars are absent; fails open on Redis errors.
  const ip = clientAddress ?? '127.0.0.1';
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return json({ error: 'Demasiados intentos. Intenta más tarde.' }, 429);
      }
    } catch {
      // Redis unavailable — fail open, let request through
    }
  }

  // Parse
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Solicitud inválida.' }, 400);

  // Honeypot check — silent 200 to fool bots
  if (typeof (body as Record<string, unknown>).website === 'string' &&
      (body as Record<string, unknown>).website !== '') {
    return json({ ok: true }, 200);
  }

  // Validate
  const result = ContactSchema.safeParse(trimStrings(body as Record<string, unknown>));
  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};
    for (const [key, msgs] of Object.entries(flat)) {
      if (msgs && msgs.length > 0) fields[key] = msgs[0];
    }
    return json({ error: 'validation', fields }, 400);
  }

  const { nombre, whatsapp, negocio, email, mensaje } = result.data;

  const resendKey    = import.meta.env.RESEND_API_KEY;
  const contactEmail = import.meta.env.CONTACT_EMAIL ?? 'hola@antonydev.com';

  const referer = request.headers.get('referer') ?? '';
  let origin = '/';
  if (referer) {
    try { origin = new URL(referer).pathname || '/'; } catch { /* ignore malformed referer */ }
  }

  if (!resendKey) {
    return json({ error: 'Servicio de correo no configurado.' }, 503);
  }

  const timestamp = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  try {
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from:    'AntonyDev <notificaciones@antonydev.com>',
      to:      contactEmail,
      ...(email ? { replyTo: email } : {}),
      subject: `Nuevo contacto: ${nombre} — ${negocio}`,
      html:    buildEmailHtml({ nombre, whatsapp, negocio, email, mensaje, timestamp, origin }),
      text: [
        'NUEVO CONTACTO — AntonyDev',
        '',
        `Nombre:    ${nombre}`,
        `WhatsApp:  ${whatsapp}`,
        `Negocio:   ${negocio}`,
        `Email:     ${email || 'N/A'}`,
        '',
        'Mensaje:',
        mensaje,
        '',
        `Enviado: ${timestamp}`,
        `Origen:  ${origin}`,
      ].join('\n'),
    });
  } catch {
    return json({
      error: 'Error al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.',
    }, 500);
  }

  return json({ ok: true }, 200);
};
