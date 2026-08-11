import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image-clickable"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <div className="product-prices">
          <span className="original-price">
            ₹{product.price}
          </span>

          <span className="offer-price">
            ₹{product.offerPrice}
          </span>
        </div>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;