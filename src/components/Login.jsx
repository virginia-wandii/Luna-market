import { useState } from "react";
import { loginUser, signInWithGoogle } from "../auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      alert("Login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      await signInWithGoogle();
      alert("Google login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#426F65] mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-[#426F65] text-white p-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full border p-3 rounded-lg mt-4"
        >
          Continue with Google
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

export default Login;