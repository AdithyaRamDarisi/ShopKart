import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      localStorage.getItem("orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <section className="order-history">

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div
              key={order.orderId}
              className="order-card"
            >

              <h3>
                Order ID: #{order.orderId}
              </h3>

              <p>
                Date: {order.orderDate || "N/A"}
              </p>

              <p>
                Status:{" "}
                <strong className="order-status">
                  {order.status || "Order Placed"}
                </strong>
              </p>

              <p>
                Customer: {order.name}
              </p>

              <p>
                Payment:{" "}
                {order.paymentMethod}
              </p>

              <h4>
                Total: ₹{order.total}
              </h4>

              <div className="order-products">

                <h4>
                  Ordered Products
                </h4>

                {order.products?.length > 0 ? (
                  order.products.map(
                    (product) => (
                      <div
                        key={product.id}
                        className="order-history-product"
                      >
                        <span>
                          {product.name} ×{" "}
                          {product.quantity}
                        </span>

                        <strong>
                          ₹
                          {product.offerPrice *
                            product.quantity}
                        </strong>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No product details available.
                  </p>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default OrderHistory;