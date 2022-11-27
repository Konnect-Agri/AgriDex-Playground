import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import home from "../styles/Home.module.css";

const Login = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const setUsername = useStore((state) => state.setUsername);
  const navigate = useNavigate();

  const handleClick = () => {
    setUsername(aadharNumber);
    navigate("/home");
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col justify-center items-center">
        <h1 className="text-6xl text-white font-bold lg:px-[120px] leading-normal">
          A display headings, rather than for extended style is intended us.
        </h1>
        <p className="text-white font-regular text-left lg:px-[120px] mt-5 text-xl tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi modi at
          aut assumenda earum aliquid fugit dolor aperiam debitis quisquam vel
          consequatur blanditiis, quidem, ratione repudiandae iusto quis
          voluptates, amet dolorem accusamus laboriosam voluptas. Iure nostrum
          voluptatibus minima omnis voluptatum saepe molestiae corrupti. Optio
          ipsam nulla odit illo omnis laudantium.
        </p>
      </div>
      <div className="w-full max-w-xs h-screen flex justify-center items-center ">
        <div className="bg-white shadow-md rounded px-8 mb-4 py-11 w-full">
          <h1 className="text-2xl font-bold">Log into your account</h1>
          <form className="mt-10">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter your Aadhar Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="aadhar_number"
                placeholder="000-0000-0000"
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
                type="button"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
