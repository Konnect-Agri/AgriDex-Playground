import { useEffect, useState } from "react";
import { useStore } from "../store/store";

const Login = () => {
  const [aadharNumber, setAadharNumber] = useState("");
  const setUsername = useStore((state) => state.setUsername);

  const username = useStore((state) => state.username);
  useEffect(() => {
    if (username !== null) {
      window.location.href = "/";
    }
  }, [username]);

  return (
    <div>
      <h3> username: {username} </h3>
      <input
        type="text"
        name="aadhar_number"
        placeholder="aadhar_number"
        onChange={(e) => setAadharNumber(e.target.value)}
      />
      <button
        onClick={() => {
          setUsername(aadharNumber);
          // useState.setState({ username: aadharNumber });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
