function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  onCheckout,
}) {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(product.id)}>
                  −
                </button>

                <span>{product.quantity}</span>

                <button onClick={() => increaseQuantity(product.id)}>
                  +
                </button>
              </div>

              <p>
                Subtotal: ₹{product.price * product.quantity}
              </p>

              <button onClick={() => removeFromCart(product.id)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{totalPrice}</h3>

          <button onClick={onCheckout}>
            Checkout
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;