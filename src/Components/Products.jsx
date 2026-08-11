import { useState } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

function Products({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "a-z") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "z-a") {
    filteredProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <section id="products" className="products">

      <div className="products-header">
        <p>OUR COLLECTION</p>
        <h2>Featured Products</h2>
      </div>

      <div className="product-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="a-z">Name: A → Z</option>
          <option value="z-a">Name: Z → A</option>
        </select>

      </div>

      <div className="product-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="no-products">
            No products found.
          </p>
        )}

      </div>

    </section>
  );
}

export default Products;