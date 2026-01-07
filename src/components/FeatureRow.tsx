import { ArrowRight } from "lucide-react";

const FeatureRow = ({ title, desc, image, reverse = false, eyebrow }) => {
  return (
    <section className="mx-auto max-w-8xl px-6">
      <div
        className={
          "mt-10 grid items-center gap-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:grid-cols-2" +
          (reverse ? " lg:[&>div:first-child]:order-2" : "")
        }
      >
        <div className="overflow-hidden rounded-2xl bg-neutral-100">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="px-1">
          {eyebrow && (
            <p className="mb-2 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">
              {eyebrow}
            </p>
          )}
          <h3 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            {title}
          </h3>
          <p className="mt-2 max-w-prose text-sm text-neutral-600">{desc}</p>
          <a
            href="#coleccion"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
          >
            Explorar <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureRow;
