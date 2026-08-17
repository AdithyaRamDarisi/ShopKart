import { useState } from "react";
import {
  useSearchParams,
} from "react-router-dom";

import products from "../data/products";
import ProductCard from "./ProductCard";

function Products({
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const [searchParams] = useSearchParams();

  const urlSearch =
    searchParams.get("search") || "";

  const urlCategory =
    searchParams.get("category") || "All";

  const [search, setSearch] =
    useState(urlSearch);

  const [category, setCategory] =
    useState(urlCategory);

  const [sort, setSort] =
    useState("default");

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================

  let filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // =========================
  // SORT PRODUCTS
  // =========================

  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) =>
        a.offerPrice - b.offerPrice
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) =>
        b.offerPrice - a.offerPrice
    );
  }

  if (sort === "a-z") {
    filteredProducts.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
  }

  if (sort === "z-a") {
    filteredProducts.sort(
      (a, b) =>
        b.name.localeCompare(a.name)
    );
  }

  return (
    <section
      id="products"
      className="products"
    >

      {/* HEADER */}
      <div className="products-header">

        <p>
          SHOPKART COLLECTION
        </p>

        <h2>
          Discover Your Style
        </h2>

      </div>

      {/* CONTROLS */}
      <div className="product-controls">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Sort By
          </option>

          <option value="low-high">
            Price: Low → High
          </option>

          <option value="high-low">
            Price: High → Low
          </option>

          <option value="a-z">
            Name: A → Z
          </option>

          <option value="z-a">
            Name: Z → A
          </option>
        </select>

      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={
                  toggleWishlist
                }
              />

            )
          )

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