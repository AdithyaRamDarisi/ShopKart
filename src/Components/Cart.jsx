function Cart({
  cart = [],
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  onCheckout,
}) {
  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      product.offerPrice *
        product.quantity,
    0
  );

  return (
    <section className="cart">

      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h3>Your cart is empty.</h3>

          <p>
            Add some products to your cart.
          </p>
        </div>

      ) : (

        <div>

          {cart.map((product) => (

            <div
              key={`${product.id}-${product.size}`}
              className="cart-item"
            >

              <img
                src={product.image}
                alt={product.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">

                <h3>{product.name}</h3>

                <p>
                  Size:{" "}
                  <strong>
                    {product.size || "N/A"}
                  </strong>
                </p>

                <div className="cart-prices">

                  <span className="cart-original-price">
                    ₹{product.price}
                  </span>

                  <span className="cart-offer-price">
                    ₹{product.offerPrice}
                  </span>

                </div>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(
                        product.id,
                        product.size
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {product.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(
                        product.id,
                        product.size
                      )
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
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(
                      product.id,
                      product.size
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <h3 className="cart-total">
            Total: ₹{totalPrice}
          </h3>

          <button
            type="button"
            className="checkout-button"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>

        </div>

      )}

    </section>
  );
}

export default Cart;