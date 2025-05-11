import service from "../../services/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        name,
        password,
      };

      await service.post("/auth/signup", newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error de comunicación con el servidor.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg  w-96 ">
        <form onSubmit={handleSignup} className="mt-8">
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
              onChange={handleEmailChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B3E96]"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-black mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="texto"
              placeholder="example: Perla."
              required
              autoComplete="current-name"
              onChange={handleNameChange}
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
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5B3E96]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4D3E7F] text-white py-2 rounded-full text-lg font-medium hover:bg-[#47307D] transition"
          >
            Create account
          </button>

          <p className="mt-8 text-center text-lg font-medium text-[#4D3E7F]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-lg  text-[##4D3E7F] hover:text-[#4D3E7F]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
