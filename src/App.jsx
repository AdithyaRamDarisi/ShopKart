import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/Login";
import OrderHistory from "./Components/OrderHistory";
import Wishlist from "./Components/Wishlist";

function App() {
  const navigate = useNavigate();

  // =========================
  // CART STATE
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // =========================
  // WISHLIST STATE
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // =========================
  // ORDER SUCCESS STATE
  // =========================

  const [orderSuccess, setOrderSuccess] =
    useState(null);

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // =========================
  // ADD TO CART
  // =========================

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

  // =========================
  // INCREASE QUANTITY
  // =========================

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

  // =========================
  // DECREASE QUANTITY
  // =========================

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

  // =========================
  // REMOVE FROM CART
  // =========================

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  }

  // =========================
  // CLEAR CART
  // =========================

  function clearCart() {
    setCart([]);
  }

  // =========================
  // TOGGLE WISHLIST
  // =========================

  function toggleWishlist(product) {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  }

  // =========================
  // START CHECKOUT
  // =========================

  function startCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setOrderSuccess(null);

    navigate("/checkout");
  }

  // =========================
  // ORDER PLACED
  // =========================

  function handleOrderPlaced(orderDetails) {
    const orderId =
      "SK-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const newOrder = {
      ...orderDetails,
      orderId: orderId,
      orderDate: new Date().toLocaleString(),
    };

    // Get existing orders
    const existingOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        newOrder,
      ])
    );

    // Store current order
    setOrderSuccess(newOrder);

    // Go to success page
    navigate("/order-success");
  }

  return (
    <div>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        cart={cart}
        wishlist={wishlist}
      />

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={
            <>
              <Hero />

              <Products
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={
                  toggleWishlist
                }
              />
            </>
          }
        />

        {/* =========================
            CART
        ========================= */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
              removeFromCart={
                removeFromCart
              }
              onCheckout={startCheckout}
            />
          }
        />

        {/* =========================
            CHECKOUT
        ========================= */}

        <Route
          path="/checkout"
          element={
            cart.length === 0 ? (
              <section className="checkout">

                <h2>
                  Your cart is empty.
                </h2>

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

        {/* =========================
            PRODUCT DETAILS
        ========================= */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            ORDER HISTORY
        ========================= */}

        <Route
          path="/orders"
          element={
            <OrderHistory />
          }
        />

        {/* =========================
            WISHLIST
        ========================= */}

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={
                toggleWishlist
              }
              addToCart={addToCart}
            />
          }
        />

        {/* =========================
            ORDER SUCCESS
        ========================= */}

        <Route
          path="/order-success"
          element={
            orderSuccess ? (

              <section className="checkout">

                <div className="order-success">

                  {/* SUCCESS ICON */}

                  <div className="success-icon">
                    ✓
                  </div>

                  {/* SUCCESS TITLE */}

                  <h2>
                    Order Placed
                    Successfully! 🎉
                  </h2>

                  {/* ORDER ID */}

                  <p className="order-id">
                    Order ID: #
                    {orderSuccess.orderId}
                  </p>

                  {/* ORDER DATE */}

                  <p className="order-date">
                    Ordered on:{" "}
                    {orderSuccess.orderDate}
                  </p>

                  {/* CUSTOMER NAME */}

                  <p>
                    Thank you,{" "}
                    {orderSuccess.name}!
                  </p>

                  {/* =========================
                      ORDER DETAILS
                  ========================= */}

                  <div className="order-details">

                    <div className="order-detail-row">

                      <span>
                        Order Total
                      </span>

                      <strong>
                        ₹{orderSuccess.total}
                      </strong>

                    </div>

                    <div className="order-detail-row">

                      <span>
                        Payment Method
                      </span>

                      <strong>
                        {
                          orderSuccess.paymentMethod
                        }
                      </strong>

                    </div>

                  </div>

                  {/* =========================
                      ORDERED PRODUCTS
                  ========================= */}

                  <div className="success-products">

                    <h3>
                      Ordered Products
                    </h3>

                    {orderSuccess.products?.length >
                    0 ? (

                      orderSuccess.products.map(
                        (product) => (

                          <div
                            key={product.id}
                            className="success-product"
                          >

                            <div>

                              <strong>
                                {product.name}
                              </strong>

                              <p>
                                Quantity:{" "}
                                {
                                  product.quantity
                                }
                              </p>

                            </div>

                            <strong>
                              ₹
                              {
                                product.offerPrice *
                                product.quantity
                              }
                            </strong>

                          </div>

                        )
                      )

                    ) : (

                      <p>
                        No product details
                        available.
                      </p>

                    )}

                  </div>

                  {/* SUCCESS MESSAGE */}

                  <p className="success-message">
                    Your order has been
                    placed successfully.
                  </p>

                  {/* CONTINUE SHOPPING */}

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

                <h2>
                  No order found.
                </h2>

              </section>

            )
          }
        />

      </Routes>

    </div>
  );
}

export default App;