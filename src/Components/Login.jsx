import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      setError(
        "Please enter username, email and password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    const loggedInUser = {
      username,
      email,
      isLoggedIn: true,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    setError("");

    navigate("/");
  }

  return (
    <section className="login-page">

      <div className="login-container">

        <div className="login-welcome">

          <span className="login-tag">
            SHOPKART
          </span>

          <h1>
            Welcome
            <br />
            Back.
          </h1>

          <p>
            Login to explore amazing
            products, discover new
            collections and enjoy a
            better shopping experience.
          </p>

        </div>

        <div className="login-form-container">

          <h2>Login</h2>

          <p className="login-subtitle">
            Login to Explore
          </p>

          <form onSubmit={handleLogin}>

            {/* Username */}

            <div className="input-group">

              <label>
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

            </div>

            {/* Email */}

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* Password */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>

          <p className="login-footer">
            New to ShopKart?
            <span>
              {" "}
              Create an account
            </span>
          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;