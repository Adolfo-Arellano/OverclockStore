export type ProductId = number | string;

export type Variant = {
  key: string;
  label: string;
  swatch: string;
  image: string;
};

export type Product = {
  id: ProductId;
  name: string;
  price: number;
  variants: Variant[];
  image?: string;
};

export type CartItem = Product & { quantity: number };

export type AddToCartFn = (item: Product) => void;

export type CartHandlers = {
  removeFromCart: (id: ProductId) => void;
  cleanCart: () => void;
  increaseQuantity: (id: ProductId) => void;
  decreaseQuantity: (id: ProductId) => void;
};
