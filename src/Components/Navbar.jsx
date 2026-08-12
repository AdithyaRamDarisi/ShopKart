import { Link } from "react-router-dom";

function Navbar({ cart = [] }) {
  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        ShopKart
      </Link>

      <ul className="navbar-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/#products">
            Products
          </Link>
        </li>

        <li className="nav-cart">
          <Link to="/#cart">
            Cart <span>({cartCount})</span>
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