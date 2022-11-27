import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const setUsername = useStore((state) => state.setUsername);
  const navigate = useNavigate();

  const handleClick = () => {
    setUsername(aadharNumber);
    navigate("/home");
  };
  return (
    <div className="home-screen grid grid-cols-3 gap-4">
      <div className="col-span-2"></div>
      <div className="w-full max-w-xs h-screen flex justify-center items-center ">
        <form className="bg-white shadow-md rounded px-8 mb-4 py-11">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="aadhar_number"
              placeholder="Enter your Aadhar number"
              onChange={(e) => setAadharNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="button"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
