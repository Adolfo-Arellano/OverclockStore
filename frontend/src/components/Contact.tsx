import { useState } from "react";
import { contactSchema } from "../validators/contactSchema";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("ok");
    setForm({ name: "", email: "", phone: "", message: "", consent: false });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
        <div className="rounded-2xl ring ring-gray-300 bg-white/70 backdrop-blur p-6 shadow transition hover:shadow-lg flex flex-col h-full">
          <h1 className="text-2xl font-semibold text-center">Formulario de contacto</h1>
          <p className="text-sm text-gray-700 mb-4 text-center">Respondemos en 24 – 48 h.</p>

          <form onSubmit={onSubmit} className="mt-4 flex h-full flex-col" noValidate> {/* space-y-5 */}
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input name="name" value={form.name} onChange={onChange}
                className="mt-2 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="Ej: Martin Fernandez" />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mt-3">Correo electrónico</label>
              <input name="email" type="email" value={form.email} onChange={onChange}
                className="mt-2 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="ejemplo@correo.com" />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mt-3">Celular (opcional)</label>
              <input name="phone" value={form.phone} onChange={onChange}
                className="mt-2 w-full rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:ring-2 hover:ring-violet-700"
                placeholder="11 1234 5678" />
            </div>

            <div>
              <label className="block text-sm font-medium mt-3">Mensaje</label>
              <textarea name="message" value={form.message} onChange={onChange} rows={5}
                className="mt-2 w-full max-h-64 rounded-lg ring ring-violet-200 px-3 py-2 outline-none focus:ring-1 focus:ring-purple-700 hover:shadow-violet-200 hover:ring-2 hover:ring-violet-700"
                placeholder="Contanos en qué podemos ayudarte" />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-start gap-2 mb-2">
              <input id="consent" name="consent" type="checkbox" checked={form.consent} onChange={onChange} className="mt-1 cursor-pointer" />
              <label htmlFor="consent" className="text-sm">
                Acepto ser contactado y la <a className="underline" href="/securityPolicy">política de privacidad</a>.
              </label>
            </div>
            {errors.consent && <p className="text-xs text-red-600 -mt-2">{errors.consent}</p>}

            <div className="flex-grow" />

            <button type="submit"
              className="w-full rounded-xl py-3 mb-1 bg-purple-800 text-white font-medium cursor-pointer transition hover:shadow-violet-200 hover:bg-violet-700/90">
              Enviar
            </button>

            <p aria-live="polite"
              className={`text-sm  ${status === "ok" ? "text-green-600" : status === "error" ? "text-red-600" : "hidden"}`}>
              {status === "ok" ? "¡Mensaje enviado! Te escribiremos pronto." : status === "error" ? "Revisá los campos marcados." : "."}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="rounded-lg border px-2 py-1">Envío seguro</span>
              <span className="rounded-lg border px-2 py-1">Pagos: MP / Tarjeta</span>
              <span className="rounded-lg border px-2 py-1">Garantía oficial</span>
            </div>
          </form>

        </div>

        <figure className="relative rounded-2xl overflow-hidden h-full">
          <img src="/img/contact.png" alt="Soporte de Overclock Store" loading="lazy" className="h-full w-full object-cover" />
          <figcaption className="text-xs text-gray-500 mt-2">Soporte 7 x 5 • Respuestas rápidas</figcaption>
        </figure>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {[
            ["¿Hacen envíos a todo el país?", "Sí, a todo el territorio nacional con seguimiento."],
            ["¿Cuánto tarda mi pedido?", "CABA/AMBA: 2 - 4 días hábiles. Interior: 3 - 7 días hábiles."],
            ["¿Qué métodos de pago aceptan?", "Tarjetas, transferencia y billeteras (MercadoPago, Ualá)."],
            ["¿Los productos tienen garantía?", "Garantía oficial (6 a 36 meses según producto)."],
            ["¿Puedo retirar en persona?", "Sí, coordinando previamente por soporte."]
          ].map(([q, a], i) => (
            <details key={i} className="rounded-xl border p-3 [&_summary]:cursor-pointer">
              <summary className="font-medium">{q}</summary>
              <p className="mt-2 text-sm text-gray-700">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-4 text-sm">¿No encontraste tu respuesta? <a href="https://web.whatsapp.com/" className="underline">Escríbenos por WhatsApp</a>.</div>
      </section>
    </div>
  );
}

export default Contact;