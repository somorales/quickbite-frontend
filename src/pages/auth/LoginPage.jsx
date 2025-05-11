import service from "../../services/config.js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import { ToastContext } from "../../context/toast.context.jsx";

import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const { setErrorMessage } = useContext(ToastContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("/auth/login", userCredentials);

      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error de comunicación con el servidor.");
      }
    }
  };

  if (isLoading) {
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg  w-96 ">
        <form onSubmit={handleLogin} className="mt-8">
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-black mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@correo.com"
              required
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B3E96]"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-black mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="example: P@r1$234."
              required
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B3E96]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4D3E7F] text-white py-2 rounded-full text-lg font-medium hover:bg-[#47307D] transition"
          >
            Login
          </button>
          {/* Enlace para registrarse */}
          <p className="mt-8 text-center text-lg font-medium text-[#4D3E7F]">
            New here?{" "}
            <Link
              to="/signup"
              className="font-bold text-lg  text-[##4D3E7F] hover:text-[#4D3E7F]"
            >
              Create an account.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
