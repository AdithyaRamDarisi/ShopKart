import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar({
  cart = [],
  wishlist = [],
  user,
  setUser,
}) {
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  function handleProductsClick(e) {
    e.preventDefault();

    if (
      window.location.pathname === "/"
    ) {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  }

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >
        ShopKart
      </Link>

      <ul className="navbar-links">

        {/* Home */}

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        {/* Products */}

        <li>
          <a
            href="#products"
            onClick={handleProductsClick}
          >
            Products
          </a>
        </li>

        {/* Cart */}

        <li className="nav-cart">
          <Link
            to="/cart"
            className="cart-link"
          >
            🛒 Cart ({cartCount})
          </Link>
        </li>

        {/* Wishlist */}

        <li className="nav-wishlist">
          <Link to="/wishlist">
            ♡ Wishlist ({wishlist.length})
          </Link>
        </li>

        {/* Logged In User */}

        {user ? (
          <>
            {/* My Orders */}

            <li className="nav-orders">
              <Link to="/orders">
                My Orders
              </Link>
            </li>

            {/* Welcome */}

            <li className="welcome-user">
              Welcome, {user.username} 👋
            </li>

            {/* Logout */}

            <li>
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          /* Login */

          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;