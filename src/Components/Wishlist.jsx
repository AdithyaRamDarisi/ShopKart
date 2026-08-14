import { useNavigate } from "react-router-dom";

function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
}) {
  const navigate = useNavigate();

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
                  removeFromWishlist(product.id)
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
                    addToCart(product)
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