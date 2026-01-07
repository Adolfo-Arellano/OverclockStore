import { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import type { CartHandlers, CartItem } from "../types/shop";

type Props = CartHandlers & { cart: CartItem[] };

export default function CartMenu({ cart, removeFromCart, cleanCart, increaseQuantity, decreaseQuantity }: Props) {
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(
    () => cart.reduce((t, item) => t + item.price * item.quantity, 0),
    [cart]
  );

  const itemCount = useMemo(() => cart.reduce((t, item) => t + item.quantity, 0), [cart]);

  return (
    <div className="relative group">
      <button className="relative rounded-full cursor-pointer bg-gradient-to-br from-purple-700 to-red-600 p-2 text-white shadow hover:bg-purple-500">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
          {itemCount}
        </span>
      </button>

      <div className="hidden group-hover:block absolute right-0 top-full bg-white p-3 shadow-xl min-w-[350px] z-50 rounded-md">
        {isEmpty ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-center align-top">
                <thead className="text-sm text-gray-500">
                  <tr>
                    <th className="pb-2">Imagen</th>
                    <th className="pb-2 px-1">Nombre</th>
                    <th className="pb-2 px-1">Precio</th>
                    <th className="pb-2 px-1">Cant.</th>
                    <th className="pb-2 px-1"></th>
                  </tr>
                </thead>
                <tbody className="text-sm text-left">
                  {cart.map(item => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-2 px-1">
                        <img className="w-15 h-15 object-cover" src={`/img/${item.image}`} alt="imagen auricular" />
                      </td>
                      <td className="py-2 px-1">{item.name}</td>
                      <td className="py-2 px-1 font-semibold">${item.price}</td>
                      <td className="py-2 px-1">
                        <div className="flex items-center ">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white w-6 h-6 text-sm hover:bg-neutral-700 cursor-pointer"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            −
                          </button>
                          <span className="min-w-5 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white w-6 h-6 text-sm hover:bg-neutral-700 cursor-pointer"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 pl-2">
                        <button
                          className="inline-flex items-center justify-center rounded-full bg-red-600 text-white w-7 h-7 text-xs hover:bg-red-500 text-center cursor-pointer"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Eliminar del carrito"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-right mt-3">
              Total pagar: <span className="font-semibold">${cartTotal}</span>
            </p>

            <button
              className="mt-3 w-full rounded-md bg-neutral-900 text-white py-2 text-sm font-semibold hover:bg-neutral-700 cursor-pointer"
              onClick={cleanCart}
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}
