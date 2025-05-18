import service from "../../services/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

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
    <div className="flex items-center justify-center h-screen bg-[#1A1A1B]">
      <div className="p-4 rounded-lg  w-96 ">
        <div className="flex justify-center">
          <img src={logo} className="h-48 flex justify-center" />
        </div>
        <form onSubmit={handleSignup} className="mt-8">
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
              onChange={handleEmailChange}
              className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 pl-10 hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white mb-2"
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
              onChange={handlePasswordChange}
              className="w-full bg-[#1A1A1B] rounded-[12px] font-bold   border border-white  placeholder-[#737373] text-white  py-3 px-4 pl-10 hover-white  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent "
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" mt-4 mb-4 w-56 py-3 px-4 bg-[#6B8E23] text-white rounded-md font-medium text-lg hover:bg-[#1C4C0D] transition-colors"
            >
              Create account
            </button>
          </div>
          <p className="mt-8 text-center text-lg font-medium text-[#FFFDD0]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-lg  text-[#FFFDD0]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
