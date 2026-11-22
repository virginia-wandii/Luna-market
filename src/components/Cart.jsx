
import { useCart } from "./CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-[#F1F1F1] px-8 py-12">
      <h1 className="mb-8 text-3xl font-bold text-[#426F65]">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty. Start shopping!
        </p>
      ) : (
        <>
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-5 shadow"
              >
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>KSh {Number(item.price).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="rounded bg-gray-200 px-3 py-1"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="rounded bg-gray-200 px-3 py-1"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold text-[#426F65]">
              Total: KSh {total.toLocaleString()}
            </h2>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;