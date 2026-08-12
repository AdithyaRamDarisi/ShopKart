import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/Login";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // Increase quantity
  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product
  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  // Order placed
  function handleOrderPlaced(orderDetails) {
    setOrderSuccess(orderDetails);
    setShowCheckout(false);
  }

  // Start checkout
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

      {/* Navbar */}
      <Navbar cart={cart} />

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />

              <Products
                addToCart={addToCart}
              />
            </>
          }
        />

        {/* CART PAGE */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              onCheckout={startCheckout}
            />
          }
        />

        {/* PRODUCT DETAILS PAGE */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>

      {/* CHECKOUT */}
      {showCheckout && (
        <Checkout
          cart={cart}
          clearCart={clearCart}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {/* ORDER SUCCESS */}
      {orderSuccess && (
        <section className="checkout">

          <div className="order-success">

            <h2>
              Order Placed Successfully! 🎉
            </h2>

            <p>
              Thank you, {orderSuccess.name}.
            </p>

            <p>
              Your order total was ₹
              {orderSuccess.total}.
            </p>

            <button
              onClick={() => setOrderSuccess(null)}
            >
              Continue Shopping
            </button>

          </div>

        </section>
      )}

    </div>
  );
}

export default App;