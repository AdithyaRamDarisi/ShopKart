import { useState } from "react";
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

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const cartCount = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  function handleSearchSubmit(e) {
    e.preventDefault();

    const search = searchValue.trim();

    if (!search) {
      return;
    }

    setShowSearch(false);

    navigate(
      `/?search=${encodeURIComponent(search)}#products`
    );

    setSearchValue("");
  }

  function handleSearchClick() {
    setShowSearch((current) => !current);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link
        to="/"
        className="navbar-logo"
      >
        ShopKart
      </Link>

      {/* MAIN NAVIGATION */}
      <ul className="navbar-links">

        <li>
          <Link to="/">
            HOME
          </Link>
        </li>

        <li>
          <Link to="/?category=Men#products">
            MEN
          </Link>
        </li>

        <li>
          <Link to="/?category=Women#products">
            WOMEN
          </Link>
        </li>

        <li>
          <Link to="/?category=Kids#products">
            KIDS
          </Link>
        </li>

        <li>
          <Link to="/?new=true#products">
            NEW ARRIVALS
          </Link>
        </li>

        <li>
          <Link
            to="/?sale=true#products"
            className="sale-link"
          >
            SALE
          </Link>
        </li>

      </ul>

      {/* RIGHT SIDE */}
      <div className="navbar-actions">

        {/* SEARCH */}
        <div className="navbar-search">

          <button
            type="button"
            className="search-button"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            🔍
          </button>

          {showSearch && (
            <form
              className="search-dropdown"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                autoFocus
                placeholder="Search for products..."
                value={searchValue}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
              />

              <button type="submit">
                Search
              </button>
            </form>
          )}

        </div>

        {/* WISHLIST */}
        <Link
          to="/wishlist"
          className="nav-icon-link"
          aria-label="Wishlist"
        >
          ♡
        </Link>

        {/* CART */}
        <Link
          to="/cart"
          className="nav-icon-link"
          aria-label="Cart"
        >
          🛍️
        </Link>

        {/* LOGIN / USER */}
        {user ? (
          <>
            <Link
              to="/orders"
              className="nav-login"
            >
              Orders
            </Link>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="nav-login"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;