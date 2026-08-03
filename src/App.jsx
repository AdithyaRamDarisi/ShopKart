import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  function handleOrderPlaced(orderDetails) {
    setOrderSuccess(orderDetails);
    setShowCheckout(false);
  }

  function startCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setOrderSuccess(null);
    setShowCheckout(true);
  }

  return (
    <div>
      <Navbar cart={cart} />

      <Hero />

      <Products addToCart={addToCart} />

      <Cart
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        onCheckout={startCheckout}
      />

      {showCheckout && (
        <Checkout
          cart={cart}
          clearCart={clearCart}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {orderSuccess && (
        <section className="checkout">
          <div className="order-success">
            <h2>Order Placed Successfully! 🎉</h2>

            <p>
              Thank you, {orderSuccess.name}.
            </p>

            <p>
              Your order total was ₹{orderSuccess.total}.
            </p>

            <button onClick={() => setOrderSuccess(null)}>
              Continue Shopping
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
export default App;