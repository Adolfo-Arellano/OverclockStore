import ProductCard from "./ProductCard";

const ProductsPreview = ({
  pCards = [],
  addToCart,
  title = "Nuestra Colección",
  subtitle = "Destacados de la semana",
  max = 4,
}) => {
  const items = Array.isArray(pCards) ? pCards.slice(0, max) : [];

  return (
    <section id="coleccion" className="mx-auto max-w-8xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">{title}</h1>
          <p className="text-lg font-semibold text-gray-500">{subtitle}</p>
        </div>
        <a
          href="/products"
          className="text-sm font-semibold text-neutral-700 hover:text-orange-600"
        >
          Ver todos →
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((pCard) => (
            <ProductCard
              key={pCard.id}
              pCard={pCard}
              addToCart={addToCart}
            />
          ))
        }
      </div>
    </section>
  );
}

export default ProductsPreview;