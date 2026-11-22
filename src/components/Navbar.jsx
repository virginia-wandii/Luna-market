import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "../AuthContext";
import { logoutUser } from "../auth";

function Navbar() {
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  async function handleLogout() {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

        <Link to="/" className="text-3xl font-bold text-[#426F65]">
          Luna Market
        </Link>

        <div className="flex items-center gap-5 text-gray-700 font-medium">
          <Link to="/" className="hover:text-[#426F65]">Home</Link>
          <a href="/#categories" className="hover:text-[#426F65]">Categories</a>
          <Link to="/shop" className="hover:text-[#426F65]">Shop</Link>
          <Link to="/about" className="hover:text-[#426F65]">About</Link>
          <Link to="/contact" className="hover:text-[#426F65]">Contact</Link>

          <Link to="/cart" className="hover:text-[#426F65]">
            Cart ({cartCount})
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center border rounded-full px-3 py-2"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-36"
          />

          <button type="submit"></button>

          <button type="button" onClick={() => setSearch("")}>
            ×
          </button>
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#426F65] text-white px-5 py-2 rounded-lg hover:bg-green-800"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-[#426F65] font-semibold">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#426F65] text-white px-5 py-2 rounded-lg hover:bg-green-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;