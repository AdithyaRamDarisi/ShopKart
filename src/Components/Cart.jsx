function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  onCheckout,
}) {
  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      product.offerPrice * product.quantity,
    0
  );

  return (
    <section id="cart" className="cart">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <div>

          {cart.map((product) => (

            <div
              key={product.id}
              className="cart-item"
            >

              <div className="cart-product-info">

                <h3>{product.name}</h3>

                <div className="cart-prices">

                  <span className="cart-original-price">
                    ₹{product.price}
                  </span>

                  <span className="cart-offer-price">
                    ₹{product.offerPrice}
                  </span>

                </div>

              </div>

              <div className="quantity-controls">

                <button
                  onClick={() =>
                    decreaseQuantity(product.id)
                  }
                >
                  −
                </button>

                <span>
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(product.id)
                  }
                >
                  +
                </button>

              </div>

              <p className="cart-subtotal">

                Subtotal: ₹
                {product.offerPrice *
                  product.quantity}

              </p>

              <button
                className="remove-button"
                onClick={() =>
                  removeFromCart(product.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <h3 className="cart-total">
            Total: ₹{totalPrice}
          </h3>

          <button
            className="checkout-button"
            onClick={onCheckout}
          >
            Checkout
          </button>

        </div>

      )}

    </section>
  );
}

export default Cart;