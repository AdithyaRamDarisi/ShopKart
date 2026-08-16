import { useState } from "react";

function Checkout({
  cart = [],
  onOrderPlaced,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "Cash on Delivery",
    });

  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      product.offerPrice *
        product.quantity,
    0
  );

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

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
      alert(
        "Please fill in all the details."
      );

      return;
    }

    const orderProducts =
      cart.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        offerPrice:
          product.offerPrice,
        size: product.size || "N/A",
        quantity:
          product.quantity,
      }));

    onOrderPlaced({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,

      paymentMethod:
        formData.paymentMethod,

      total: totalPrice,

      products: orderProducts,
    });
  }

  return (
    <section className="checkout">

      <h2>Checkout</h2>

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
      >

        <h3>
          Customer Details
        </h3>

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

        <h3>
          Payment Method
        </h3>

        <div className="payment-methods">

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={
                formData.paymentMethod ===
                "Cash on Delivery"
              }
              onChange={handleChange}
            />

            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={
                formData.paymentMethod ===
                "UPI"
              }
              onChange={handleChange}
            />

            UPI
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={
                formData.paymentMethod ===
                "Card"
              }
              onChange={handleChange}
            />

            Card
          </label>

        </div>

        <h3>
          Order Summary
        </h3>

        <div className="checkout-products">

          {cart.map((product) => (

            <div
              className="checkout-product"
              key={`${product.id}-${product.size}`}
            >

              <div>

                <strong>
                  {product.name}
                </strong>

                <p>
                  Size:{" "}
                  {product.size || "N/A"}
                </p>

                <p>
                  Quantity:{" "}
                  {product.quantity}
                </p>

              </div>

              <strong>
                ₹
                {product.offerPrice *
                  product.quantity}
              </strong>

            </div>

          ))}

        </div>

        <h3>
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