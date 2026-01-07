import { useMemo, useState } from "react";
import styles from "./ProductCard.module.css";
import type { AddToCartFn, Product, Variant } from "../types/shop";

type Props = {
  pCard: Product;
  addToCart: AddToCartFn;
};

const ProductCard = ({ pCard, addToCart }: Props) => {
  const { id, name, price } = pCard;
  const variants: Variant[] = Array.isArray(pCard?.variants) ? pCard.variants : [];
  const [selected, setSelected] = useState<Variant | null>(variants[0] ?? null);

  const composedId = useMemo(() => (selected ? `${id}-${selected.key}` : id), [id, selected]);

  const imgSrc = selected ? `/img/${selected.image}` : "/img/placeholder.png";
  const alt = selected ? `Auriculares ${name} - ${selected.label}` : `Auriculares ${name}`;

  const handleAdd = () => {
    if (!selected) return;
    addToCart({
      ...pCard,
      id: composedId,
      name: `${name} (${selected.label})`,
      image: selected.image,
      price,
    });
  };

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border
      border-gray-200 bg-white/95 shadow-sm ring-1 ring-transparent transition-all
      duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-neutral-200"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-tr from-red-500/10 to-blue-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-amber-500/10 blur-2xl" />

      <div className="relative mx-4 mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 via-white to-gray-300">
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          className="h-full w-full max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-md bg-neutral-900/90 px-2 py-1
          text-[11px] font-semibold uppercase tracking-wide text-white shadow"
        >
          HyperX
        </span>
      </div>

      <div className="mx-4 mt-4 text-center">
        <h3 className="text-lg md:text-2xl font-extrabold uppercase tracking-wide text-gray-900">
          {name}
        </h3>
        <p className="text-2xl font-bold text-gray-900">${price}</p>
        <p className="text-gray-600">Envío rápido • Garantía oficial</p>
      </div>

      <div className="mt-auto flex flex-col gap-3 p-4">
        <div className="ml-auto flex items-center gap-2">
          {variants.map((v) => {
            const isSel = selected?.key === v.key;
            return (
              <button
                key={v.key}
                type="button"
                title={v.label}
                aria-pressed={isSel}
                onClick={() => setSelected(v)}
                className={`grid place-items-center h-6 w-6 rounded-full ring-2
                ${isSel ? "ring-gray-500 scale-110" : "ring-gray-300"}
                transition-transform focus:outline-none focus-visible:ring-2
                focus-visible:ring-gray-400`}
              >
                <span className={`${styles.fill} ${styles[`fill--${v.swatch}`] || ""} rounded-full cursor-crosshair`} />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!selected}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg
          bg-gradient-to-r from-gray-900 to-gray-600 px-4 py-2 text-sm font-bold
          text-white shadow-md transition-all hover:from-neutral-800 hover:to-black
          active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          <span aria-hidden>🛒</span> Agregar al Carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;