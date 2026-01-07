const SecurityPolicy = () => {
  return (
    <div className="p-5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-700 leading-relaxed shadow-sm">
      <a
        href="/contact"
        className="inline-flex items-center gap-2 text-neutral-700 font-medium text-sm hover:text-neutral-900 transition-colors"
      >
        ← Volver al formulario
      </a>

      <h1 className="font-semibold text-center text-2xl mb-2 text-neutral-800">
        Política de privacidad
      </h1>
      
      <p className="mb-2 text-base">
        Este es un proyecto personal, así que no tengo ningún interés en tus datos. La información que
        escribas acá se usa únicamente para simular el flujo real de un formulario.
      </p>

      <p className="mb-2 text-base">
        No se guarda en una base de datos, no se envía a terceros y no termina misteriosamente en una lista de spam.
      </p>

      <p className="mb-2 text-base">
        Si estás viendo esto porque sos reclutador/a o colega dev: gracias por darte una vuelta ❤️. Y sí,
        también hice este texto para que te rías un poco mientras revisás el código.
      </p>

      <p className="font-medium mt-2 text-base">
        En resumen: tus datos no van a ningún lado.  
        Esto es solo un formulario bello y funcional para demostrar skills.
      </p>
    </div>
  );
};

export default SecurityPolicy;
