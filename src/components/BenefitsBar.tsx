import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

const BenefitsBar = () => {
  const items = [
    { icon: Truck, title: "Envío rápido", desc: "a todo el país" },
    { icon: ShieldCheck, title: "Garantía oficial", desc: "hasta 2 años" },
    { icon: RefreshCw, title: "Cambios fáciles", desc: "30 días" },
  ];

  return (
    <section className="mx-auto max-w-8xl px-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
        <Icon className="h-5 w-5 text-neutral-700" />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-neutral-500">{desc}</p>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}

export default BenefitsBar;