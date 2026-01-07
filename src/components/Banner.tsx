import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <section className="mx-auto max-w-8xl px-6 pb-10 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-neutral-50 shadow-sm">
        <img
          src="/img/GPU.png"
          alt="Setup gamer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        <div className="relative grid min-h-[420px] grid-cols-1 items-center p-8 sm:p-12 lg:grid-cols-2">
          <div className="text-white">
          <p className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur">NUEVA COLECCIÓN</p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl text-white font-rajdhani">Rendimiento de élite</h1>
          <h2 className="text-4xl text-white font-extrabold">Diseño minimal</h2>
          <p className="mt-2 max-w-xl text-lg text-white/80">Auriculares, teclados, micrófonos y más. Componentes optimizados para PC y consolas, listos para elevar tu setup.</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#coleccion" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              Ver productos <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#ofertas" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
            Ofertas de la semana
            </a>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-full lg:block">
          <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-orange-400/30 blur-3xl" />
        </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;