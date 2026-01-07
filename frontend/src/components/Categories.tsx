import { Gamepad2, Headphones, Keyboard, Mic2, MonitorSmartphone } from "lucide-react";

const Categories = () => {
  const cats = [
    { icon: Headphones, label: "Headsets" },
    { icon: Keyboard, label: "Teclados" },
    { icon: Mic2, label: "Micrófonos" },
    { icon: Gamepad2, label: "Controladores" },
    { icon: MonitorSmartphone, label: "Accesorios" },
  ];

return (
    <section className="mx-auto max-w-8xl px-6 py-10">
      <h4 className="mb-4 text-sm font-bold tracking-wide text-neutral-500">CATEGORÍAS PRINCIPALES</h4>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
        {cats.map(({ icon: Icon, label }) => (
          <div key={label} className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100">
              <Icon className="h-5 w-5 text-neutral-700" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;