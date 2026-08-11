function Hero() {
  const handleShopNow = () => {
    document
      .getElementById("products")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-subtitle">
          WELCOME TO SHOPKART
        </h2>

        <h1>
          Smart Shopping
          <br />
          Starts Here.
        </h1>

        <p className="hero-description">
          Explore top-quality products for every lifestyle.
        </p>

        <button onClick={handleShopNow}>
          Explore Now
        </button>
      </div>
    </section>
  );
}

export default Hero;