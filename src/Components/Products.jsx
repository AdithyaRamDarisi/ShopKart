import products from "../data/products";
import ProductCard from "./ProductCard";

function Products({ addToCart }) {
  return (
    <section id="products" className="products">
      <div className="products-header">
        <p>OUR COLLECTION</p>
        <h2>Featured Products</h2>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;