import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const navigate = useNavigate();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Add product to cart
    addToCart(product);

    // Find product image
    const productImage =
      e.currentTarget
        .closest(".product-card")
        ?.querySelector(".product-image-clickable");

    // Find cart in navbar
    const cartElement =
      document.querySelector(".nav-cart a");

    if (!productImage || !cartElement) {
      return;
    }

    // Get positions
    const imageRect =
      productImage.getBoundingClientRect();

    const cartRect =
      cartElement.getBoundingClientRect();

    // Create flying image
    const flyingImage =
      productImage.cloneNode(true);

    flyingImage.classList.add(
      "flying-product-image"
    );

    // Starting position
    flyingImage.style.left =
      `${imageRect.left}px`;

    flyingImage.style.top =
      `${imageRect.top}px`;

    flyingImage.style.width =
      `${imageRect.width}px`;

    flyingImage.style.height =
      `${imageRect.height}px`;

    document.body.appendChild(flyingImage);

    // Calculate movement
    const startX =
      imageRect.left + imageRect.width / 2;

    const startY =
      imageRect.top + imageRect.height / 2;

    const endX =
      cartRect.left + cartRect.width / 2;

    const endY =
      cartRect.top + cartRect.height / 2;

    const moveX = endX - startX;
    const moveY = endY - startY;

    // Start animation
    requestAnimationFrame(() => {
      flyingImage.style.transform =
        `translate(${moveX}px, ${moveY}px) scale(0.12) rotate(12deg)`;

      flyingImage.style.opacity = "0.2";
      flyingImage.style.borderRadius = "50%";
    });

    // Remove animation element
    setTimeout(() => {
      flyingImage.remove();

      // Cart bounce
      cartElement.classList.add(
        "cart-bounce"
      );

      setTimeout(() => {
        cartElement.classList.remove(
          "cart-bounce"
        );
      }, 450);
    }, 700);
  };

  return (
    <article className="product-card">

      {/* Wishlist */}
      <button
        type="button"
        className={`wishlist-button ${
          isWishlisted ? "active" : ""
        }`}
        onClick={handleWishlistClick}
        aria-label={
          isWishlisted
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="product-image-clickable"
        onClick={handleProductClick}
      />

      {/* Product Information */}
      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        {/* Prices */}
        <div className="product-prices">

          <span className="original-price">
            ₹{product.price}
          </span>

          <span className="offer-price">
            ₹{product.offerPrice}
          </span>

        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

      </div>

    </article>
  );
}

export default ProductCard;