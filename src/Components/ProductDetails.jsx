import {
  useParams,
  useNavigate,
} from "react-router-dom";

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

          {/* Rating */}

          <div className="details-rating">

            <span className="rating-stars">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </span>

            <span>
              {product.rating} / 5
            </span>

            <span>
              ({product.reviews} reviews)
            </span>

          </div>

          {/* Prices */}

          <div className="details-prices">

            <span className="details-original-price">
              ₹{product.price}
            </span>

            <span className="details-offer-price">
              ₹{product.offerPrice}
            </span>

          </div>

          {/* Description */}

          <p className="details-description">
            {product.description}
          </p>

          {/* Available Sizes */}

          <div className="details-sizes">

            <strong>
              Available Sizes:
            </strong>

            <div className="details-size-list">

              {product.sizes.map(
                (size) => (
                  <span key={size}>
                    {size}
                  </span>
                )
              )}

            </div>

          </div>

          <button
            className="details-cart-button"
            onClick={() =>
              addToCart({
                ...product,
                size: product.sizes[0],
              })
            }
          >
            Add to Cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;