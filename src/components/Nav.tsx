import { useState } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import CartMenu from "./CartMenu";
import type { CartHandlers, CartItem } from "../types/shop";

type Props = CartHandlers & { cart: CartItem[] };

export default function Nav({ cart, removeFromCart, cleanCart, increaseQuantity, decreaseQuantity }: Props) {
  const [open, setOpen] = useState(false);

  const linkBase =
    "relative font-medium text-lg transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-700 after:to-red-600 after:transition-all after:duration-300 hover:after:w-full";

  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    `${linkBase} ${isActive ? "text-purple-900 after:w-full" : "text-gray-700 hover:text-gray-900"}`;

  return (
    <header className="sticky text- top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className=" flex mx-20 max-w-8xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 ">
          <a href="/"><img src="/img/Overclock3.png" alt="Logo" className="h-16 w-28"/></a>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink to="/" end className={navLinkClass}>Inicio</NavLink>
          <NavLink to="/products" className={navLinkClass}>Productos</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contacto</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-gray-300/50 cursor-pointer">
            <Search className="h-7 w-7 text-gray-700" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-300/50 cursor-pointer">
            <User className="h-7 w-7 text-gray-700" />
          </button>

          <CartMenu
            cart={cart}
            removeFromCart={removeFromCart}
            cleanCart={cleanCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="lg900:hidden rounded-full p-2 hover:bg-gray-300/50 cursor-pointer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-7 w-7 text-gray-700" /> : <Menu className="h-7 w-7 text-gray-700" />}
          </button>

          {open && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/30 lg900:hidden"
                onClick={() => setOpen(false)}
              />

              <aside className="fixed right-0 top-0 z-50 h-dvh w-72 bg-white shadow-xl lg900:hidden">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <span className="font-semibold text-gray-800">Menú</span>
                  <button
                    className="rounded-full p-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú"
                  >
                    <X className="h-6 w-6 text-gray-700" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 p-4">
                  <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Inicio</NavLink>
                  <NavLink to="/products" className={navLinkClass} onClick={() => setOpen(false)}>Productos</NavLink>
                  <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>Contacto</NavLink>
                </nav>
              </aside>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
