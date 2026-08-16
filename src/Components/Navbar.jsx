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

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <a
            href="#products"
            onClick={handleProductsClick}
          >
            Products
          </a>
        </li>

        <li className="nav-cart">
          <Link
            to="/cart"
            className="cart-link"
          >
            🛒 Cart ({cartCount})
          </Link>
        </li>

        <li className="nav-wishlist">
          <Link to="/wishlist">
            ♡ Wishlist ({wishlist.length})
          </Link>
        </li>

        <li>
          <Link to="/orders">
            My Orders
          </Link>
        </li>

        {user ? (
          <>
            <li className="welcome-user">
              Welcome, {user.username} 👋
            </li>

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