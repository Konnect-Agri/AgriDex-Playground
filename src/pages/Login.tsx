import { SyntheticEvent, useCallback, useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import home from "../styles/Home.module.css";
import toast from "react-hot-toast";
import axios from "axios";
const AapplicationId = "27690896-b128-474a-b171-0c3057d55bed";
const Login = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const setUsername = useStore((state) => state.setUsername);
  const navigate = useNavigate();

  const handleClick = () => {
    setUsername(aadharNumber);
    navigate("/home");
  };

  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const navigateTo = useNavigate();
  const handleLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      const url = `https://auth.konnect.samagra.io/api/login`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `HZmKaLCvHMJ36eChXdSpdT7IMqKXr-3rpldpCTmwBJxKFKDf-1h31QwN`,
        },
      };
      console.log("vbn:", { loginId, password });
      axios
        .post(url, { loginId, password, applicationId: AapplicationId }, config)
        .then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("email", loginId ? loginId : "");
            localStorage.setItem("token", res?.data?.token);
            navigateTo("/home");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [loginId, password]
  );

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
        <div className="bg-white shadow-md rounded px-8 mb-4 py-11 w-full bg-opacity-70">
          <h1 className="text-2xl font-bold text-gray-800">
            Login to your account
          </h1>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Id"
                value={loginId}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setLoginId(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>

          {/* <form className="mt-10">
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-regular mb-2">
                Aadhar Number
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
                className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full text-lg"
                type="button"
                onClick={handleClick}
              >
                Login
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
