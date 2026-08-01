function Cart({ cart }) {
  return (
    <section className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>
                ₹{product.price} × {product.quantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Cart;