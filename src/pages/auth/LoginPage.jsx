import service from "../../services/config.js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import { ToastContext } from "../../context/toast.context.jsx";
import logo from "../../assets/images/Logo.png";

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
    <div className="flex items-center justify-center h-screen bg-[#1A1A1B]">
      <div className="p-4 rounded-lg  w-96 ">
        <div className="flex justify-center">
          <img src={logo} className="h-48 flex justify-center" />
        </div>
        <form onSubmit={handleLogin} className="mt-8">
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white mb-2"
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
              className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 pl-10 hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white mb-2"
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
              className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 pl-10 hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" mt-4 mb-4 w-56 py-3 px-4 bg-[#6B8E23] text-white rounded-md font-medium text-lg hover:bg-[#1C4C0D] transition-colors"
            >
              Login
            </button>
          </div>

          {/* Enlace para registrarse */}
          <p className="mt-8 text-center text-lg font-medium text-[#FFFDD0]">
            New here?{" "}
            <Link to="/signup" className="font-bold text-lg  text-[#FFFDD0] ">
              Create an account.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
