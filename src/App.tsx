import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import SecurityPolicy from "./components/SecurityPolicy";
import { db } from "./data/db";
import type { CartItem, Product, ProductId } from "./types/shop";

const App = () => {
  const initialCart = (): CartItem[] => {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  };

  const [pCards] = useState<Product[]>(db);
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 10;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Product) => {
    const idx = cart.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      if (cart[idx].quantity >= MAX_ITEMS) return;
      const updated = [...cart];
      updated[idx].quantity++;
      setCart(updated);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: ProductId) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const cleanCart = () => setCart([]);

  const decreaseQuantity = (id: ProductId) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > MIN_ITEMS ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

  const increaseQuantity = (id: ProductId) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity < MAX_ITEMS ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

  return (
    <>
      <Nav
        cart={cart}
        removeFromCart={removeFromCart}
        cleanCart={cleanCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container mx-auto mt-12 px-4">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products pCards={pCards} addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/securityPolicy" element={<SecurityPolicy />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
