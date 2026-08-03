function Hero() {
  const handleShopNow = () => {
    document
      .getElementById("products")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">WELCOME TO NYBKART</p>

        <h1>
          Smart Shopping
          <br />
          Starts Here.
        </h1>

        <p className="hero-description">
          <h3>Explore top-quality products for every lifestyle.</h3> 
        </p>

        <button onClick={handleShopNow}>Shop Now</button>
      </div>
    </section>
  );
}

export default Hero;