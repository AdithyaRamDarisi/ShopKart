import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cart = [],
  wishlist = [],
}) {
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  const handleProductsClick = (e) => {
    e.preventDefault();

    // If already on Home page
    if (window.location.pathname === "/") {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      // Go to Home first
      navigate("/");

      // Wait for Home/Products section to render
      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
      >
        ShopKart
      </Link>

      {/* Navigation */}
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

        <li>
          <Link to="/login">
            Login
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;