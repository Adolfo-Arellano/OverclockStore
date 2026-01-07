import ProductCard from "./ProductCard";
import type { Product, AddToCartFn } from "../types/shop";

type Props = {
  pCards: Product[];
  addToCart: AddToCartFn;
};

const Products = ({ pCards, addToCart }: Props) => {
  return (
    <>
      <h2 className="text-center text-4xl md:text-5xl font-black text-[color:rgb(var(--brand))]">
        Nuestra Colección
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pCards.map((pCard) => (
          <ProductCard key={String(pCard.id)} pCard={pCard} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default Products;
