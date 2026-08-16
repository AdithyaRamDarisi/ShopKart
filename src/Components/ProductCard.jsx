import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] =
    useState("");

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  function handleProductClick() {
    navigate(`/product/${product.id}`);
  }

  function handleWishlistClick(e) {
    e.stopPropagation();

    if (toggleWishlist) {
      toggleWishlist(product);
    }
  }

  function handleAddToCart(e) {
    e.stopPropagation();

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
    });

    const productImage =
      e.currentTarget
        .closest(".product-card")
        ?.querySelector(
          ".product-image-clickable"
        );

    const cartElement =
      document.querySelector(".nav-cart a");

    if (!productImage || !cartElement) {
      return;
    }

    const imageRect =
      productImage.getBoundingClientRect();

    const cartRect =
      cartElement.getBoundingClientRect();

    const flyingImage =
      productImage.cloneNode(true);

    flyingImage.classList.add(
      "flying-product-image"
    );

    flyingImage.style.left =
      `${imageRect.left}px`;

    flyingImage.style.top =
      `${imageRect.top}px`;

    flyingImage.style.width =
      `${imageRect.width}px`;

    flyingImage.style.height =
      `${imageRect.height}px`;

    document.body.appendChild(
      flyingImage
    );

    const startX =
      imageRect.left +
      imageRect.width / 2;

    const startY =
      imageRect.top +
      imageRect.height / 2;

    const endX =
      cartRect.left +
      cartRect.width / 2;

    const endY =
      cartRect.top +
      cartRect.height / 2;

    const moveX = endX - startX;
    const moveY = endY - startY;

    requestAnimationFrame(() => {
      flyingImage.style.transform =
        `translate(${moveX}px, ${moveY}px) scale(0.12) rotate(12deg)`;

      flyingImage.style.opacity = "0.2";
      flyingImage.style.borderRadius = "50%";
    });

    setTimeout(() => {
      flyingImage.remove();

      cartElement.classList.add(
        "cart-bounce"
      );

      setTimeout(() => {
        cartElement.classList.remove(
          "cart-bounce"
        );
      }, 450);
    }, 700);
  }

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

        {/* Rating */}

        <div className="product-rating">

          <span className="rating-stars">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </span>

          <span className="rating-number">
            {product.rating}
          </span>

          <span className="review-count">
            ({product.reviews})
          </span>

        </div>

        {/* Prices */}

        <div className="product-prices">

          <span className="original-price">
            ₹{product.price}
          </span>

          <span className="offer-price">
            ₹{product.offerPrice}
          </span>

        </div>

        {/* SIZE */}

        <div className="size-selection">

          <p>Select Size:</p>

          <div className="size-options">

            {product.sizes.map((size) => (

              <button
                key={size}
                type="button"
                className={
                  selectedSize === size
                    ? "size-button selected"
                    : "size-button"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
              >
                {size}
              </button>

            ))}

          </div>

        </div>

        {/* ADD TO CART */}

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