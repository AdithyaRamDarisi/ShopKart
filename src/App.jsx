import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/Login";

function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [orderSuccess, setOrderSuccess] =
    useState(null);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Add product to cart
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
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
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  // Remove product
  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  // Start checkout
  function startCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setOrderSuccess(null);
    navigate("/checkout");
  }

  // Order placed
  function handleOrderPlaced(orderDetails) {
    setOrderSuccess(orderDetails);
    navigate("/order-success");
  }

  return (
    <div>

      <Navbar cart={cart} />

      <Routes>

        {/* HOME */}
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

        {/* CART */}
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

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            cart.length === 0 ? (
              <section className="checkout">
                <h2>Your cart is empty.</h2>
              </section>
            ) : (
              <Checkout
                cart={cart}
                clearCart={clearCart}
                onOrderPlaced={
                  handleOrderPlaced
                }
              />
            )
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ORDER SUCCESS */}
        <Route
          path="/order-success"
          element={
            orderSuccess ? (
              <section className="checkout">

                <div className="order-success">

                  <h2>
                    Order Placed Successfully! 🎉
                  </h2>

                  <p>
                    Thank you,{" "}
                    {orderSuccess.name}.
                  </p>

                  <p>
                    Your order total was ₹
                    {orderSuccess.total}.
                  </p>

                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      navigate("/");
                    }}
                  >
                    Continue Shopping
                  </button>

                </div>

              </section>
            ) : (
              <section className="checkout">
                <h2>No order found.</h2>
              </section>
            )
          }
        />

      </Routes>

    </div>
  );
}

export default App;