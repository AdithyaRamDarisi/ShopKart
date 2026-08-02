function Navbar({ cart = [] }) {
  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <nav>
      <h2>ShopSphere</h2>

      <ul>
        <li>Home</li>
        <li>Products</li>
        <li className="nav-cart">
          Cart <span>({cartCount})</span>
        </li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;