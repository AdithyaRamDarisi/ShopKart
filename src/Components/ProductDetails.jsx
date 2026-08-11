import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <section className="product-details">

        <h2>Product Not Found</h2>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          Back to Products
        </button>

      </section>
    );
  }

  return (
    <section className="product-details">

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Products
      </button>

      <div className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-prices">

            <span className="details-original-price">
              ₹{product.price}
            </span>

            <span className="details-offer-price">
              ₹{product.offerPrice}
            </span>

          </div>

          <p className="details-description">
            Discover premium quality and stylish design
            with this {product.name}. Perfect for your
            everyday lifestyle.
          </p>

          <button
            className="details-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;