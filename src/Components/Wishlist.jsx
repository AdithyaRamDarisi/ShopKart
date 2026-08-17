import { useNavigate } from "react-router-dom";

function Wishlist({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const navigate = useNavigate();

  function handleAddToCart(product) {
    if (!product.sizes || product.sizes.length === 0) {
      addToCart(product);
      return;
    }

    // No size selector on the wishlist card, so default
    // to the first available size rather than adding
    // an item with size: undefined.
    addToCart({
      ...product,
      size: product.sizes[0],
    });
  }

  return (
    <section className="wishlist">

      {/* HEADER */}
      <div className="wishlist-header">
        <p>MY COLLECTION</p>

        <h2>
          My Wishlist <span>♥</span>
        </h2>
      </div>

      {/* EMPTY WISHLIST */}
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">

          <div className="empty-heart">
            ♡
          </div>

          <h3>
            Your Wishlist is Empty
          </h3>

          <p>
            Save your favorite products here
            and come back to them later.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>
      ) : (

        /* WISHLIST PRODUCTS */
        <div className="wishlist-grid">

          {wishlist.map((product) => (

            <div
              key={product.id}
              className="wishlist-card"
            >

              {/* REMOVE BUTTON */}
              <button
                className="wishlist-remove"
                onClick={() =>
                  toggleWishlist(product)
                }
                title="Remove from wishlist"
              >
                ♥
              </button>

              {/* PRODUCT IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                onClick={() =>
                  navigate(
                    `/product/${product.id}`
                  )
                }
              />

              {/* PRODUCT INFORMATION */}
              <div className="wishlist-info">

                <p>
                  {product.category}
                </p>

                <h3>
                  {product.name}
                </h3>

                {/* PRICE */}
                <div className="wishlist-price">

                  <span>
                    ₹{product.price}
                  </span>

                  <strong>
                    ₹{product.offerPrice}
                  </strong>

                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default Wishlist;