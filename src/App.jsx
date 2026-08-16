import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

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
  // USER
  // =========================

  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] =
    useState(() => {
      const savedWishlist =
        localStorage.getItem(
          "wishlist"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });

  // =========================
  // ORDER SUCCESS
  // =========================

  const [orderSuccess, setOrderSuccess] =
    useState(null);

  // =========================
  // SAVE USER
  // =========================

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
          (item) =>
            item.id === product.id &&
            item.size === product.size
        );

      if (existingProduct) {

        return currentCart.map(
          (item) =>
            item.id === product.id &&
            item.size === product.size
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
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
  // INCREASE
  // =========================

  function increaseQuantity(
    id,
    size
  ) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  // =========================
  // DECREASE
  // =========================

  function decreaseQuantity(
    id,
    size
  ) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  // =========================
  // REMOVE
  // =========================

  function removeFromCart(
    id,
    size
  ) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
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
  // WISHLIST
  // =========================

  function toggleWishlist(product) {
    setWishlist((currentWishlist) => {

      const exists =
        currentWishlist.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return currentWishlist.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  }

  // =========================
  // CHECKOUT
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

  function handleOrderPlaced(
    orderDetails
  ) {
    const orderId =
      "SK-" +
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    const newOrder = {
      ...orderDetails,

      // Save complete cart
      products: [...cart],

      orderId,

      orderDate:
        new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        newOrder,
      ])
    );

    setOrderSuccess(newOrder);

    clearCart();

    navigate("/order-success");
  }

  return (
    <div>

      <Navbar
        cart={cart}
        wishlist={wishlist}
        user={user}
        setUser={setUser}
      />

      <Routes>

        {/* HOME */}

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

        {/* CART */}

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
              onCheckout={
                startCheckout
              }
            />
          }
        />

        {/* CHECKOUT */}

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
          element={
            <Login
              setUser={setUser}
            />
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <OrderHistory />
          }
        />

        {/* WISHLIST */}

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

        {/* ORDER SUCCESS */}

        <Route
          path="/order-success"
          element={
            orderSuccess ? (

              <section className="checkout">

                <div className="order-success">

                  <div className="success-icon">
                    ✓
                  </div>

                  <h2>
                    Order Placed
                    Successfully! 🎉
                  </h2>

                  <p className="order-id">
                    Order ID: #
                    {
                      orderSuccess.orderId
                    }
                  </p>

                  <p className="order-date">
                    Ordered on:{" "}
                    {
                      orderSuccess.orderDate
                    }
                  </p>

                  <p>
                    Thank you,{" "}
                    {orderSuccess.name}!
                  </p>

                  <div className="order-details">

                    <div className="order-detail-row">
                      <span>
                        Order Total
                      </span>

                      <strong>
                        ₹
                        {
                          orderSuccess.total
                        }
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

                  <div className="success-products">

                    <h3>
                      Ordered Products
                    </h3>

                    {orderSuccess.products?.map(
                      (product) => (

                        <div
                          key={`${product.id}-${product.size}`}
                          className="success-product"
                        >

                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <p>
                              Size:{" "}
                              {
                                product.size
                              }
                            </p>

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
                    )}

                  </div>

                  <button
                    type="button"
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