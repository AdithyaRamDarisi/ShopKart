import { useState } from "react";

function Checkout({
  cart,
  clearCart,
  onOrderPlaced,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      product.offerPrice * product.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Please fill in all the details.");
      return;
    }

    const finalTotal = totalPrice;

    clearCart();

    onOrderPlaced({
      name: formData.name,
      total: finalTotal,
    });
  }

  return (
    <section className="checkout">

      <h2>Checkout</h2>

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
      >

        <h3>Customer Details</h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
        />

        <h3>Order Summary</h3>

        {cart.map((product) => (

          <div
            key={product.id}
            className="checkout-product"
          >

            <p className="checkout-product-name">
              {product.name} × {product.quantity}
            </p>

            <p className="checkout-product-price">

              <span className="checkout-original-price">
                ₹{product.price * product.quantity}
              </span>

              <strong>
                ₹{product.offerPrice * product.quantity}
              </strong>

            </p>

          </div>

        ))}

        <h3 className="checkout-total">
          Total: ₹{totalPrice}
        </h3>

        <button type="submit">
          Place Order
        </button>

      </form>

    </section>
  );
}

export default Checkout;