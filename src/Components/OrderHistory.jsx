import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <section className="orders-page">

      <h2>
        My Orders 📦
      </h2>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <h3>
            No orders yet.
          </h3>

          <p>
            Your completed orders will
            appear here.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders
            .slice()
            .reverse()
            .map((order, index) => (

              <div
                className="order-card"
                key={
                  order.orderId ||
                  index
                }
              >

                <div className="order-header">

                  <div>

                    <h3>
                      Order #
                      {order.orderId}
                    </h3>

                    <p>
                      {order.orderDate}
                    </p>

                  </div>

                  <strong>
                    ₹{order.total}
                  </strong>

                </div>

                <div className="order-products">

                  {order.products?.map(
                    (product, productIndex) => (

                      <div
                        className="order-product"
                        key={
                          `${product.id}-${product.size}-${productIndex}`
                        }
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="order-product-info">

                          <h4>
                            {product.name}
                          </h4>

                          <p>
                            Size:{" "}
                            <strong>
                              {
                                product.size ||
                                "N/A"
                              }
                            </strong>
                          </p>

                          <p>
                            Quantity:{" "}
                            <strong>
                              {
                                product.quantity
                              }
                            </strong>
                          </p>

                        </div>

                        <strong>
                          ₹
                          {product.offerPrice *
                            product.quantity}
                        </strong>

                      </div>

                    )
                  )}

                </div>

                <div className="order-summary">

                  <div>
                    <span>
                      Customer
                    </span>

                    <strong>
                      {order.name}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payment
                    </span>

                    <strong>
                      {
                        order.paymentMethod ||
                        "Not available"
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{order.total}
                    </strong>
                  </div>

                </div>

              </div>

            ))}

        </div>

      )}

    </section>
  );
}

export default OrderHistory;