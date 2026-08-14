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

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

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

    // Name validation
    if (formData.name.trim().length < 3) {
      alert(
        "Name must be at least 3 characters."
      );
      return;
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(formData.phone)) {
      alert(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    // Address validation
    if (formData.address.trim().length < 10) {
      alert(
        "Address must be at least 10 characters."
      );
      return;
    }

    const finalTotal = totalPrice;

    // Send complete order information
    onOrderPlaced({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      total: finalTotal,
      paymentMethod: paymentMethod,
      products: cart,
    });

    // Clear cart after order data is captured
    clearCart();
  }

  return (
    <section className="checkout">

      <h2>Checkout</h2>

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
      >

        {/* Customer Details */}

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

        {/* Order Summary */}

        <h3>Order Summary</h3>

        {cart.map((product) => (
          <div
            key={product.id}
            className="checkout-product"
          >

            <p className="checkout-product-name">
              {product.name} ×{" "}
              {product.quantity}
            </p>

            <p className="checkout-product-price">

              <span className="checkout-original-price">
                ₹
                {product.price *
                  product.quantity}
              </span>

              <strong>
                ₹
                {product.offerPrice *
                  product.quantity}
              </strong>

            </p>

          </div>
        ))}

        <h3 className="checkout-total">
          Total: ₹{totalPrice}
        </h3>

        {/* Payment Method */}

        <h3>Payment Method</h3>

        <div className="payment-methods">

          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={
                paymentMethod ===
                "Cash on Delivery"
              }
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value
                )
              }
            />

            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={
                paymentMethod === "UPI"
              }
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value
                )
              }
            />

            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Credit / Debit Card"
              checked={
                paymentMethod ===
                "Credit / Debit Card"
              }
              onChange={(event) =>
                setPaymentMethod(
                  event.target.value
                )
              }
            />

            Credit / Debit Card
          </label>

        </div>

        {/* Place Order */}

        <button type="submit">
          Place Order
        </button>

      </form>

    </section>
  );
}

export default Checkout;