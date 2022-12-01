import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = (props: any) => {
  const { socket } = props;
  const navigate = useNavigate();
  const [block, setBlock] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");

  const handleClick = () => {
    socket.emit("search", {
      query: "",
      filters: {
        bank_name: bankName,
        block,
        district,
      },
    });
    navigate("/banks");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white px-11 mx-5 py-11 rounded shadow-md bg-opacity-70">
        <div>
          <Link to="/search">
            <div className="flex items-center justify-between">
              <button
                className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full text-lg"
                type="button"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </Link>
          <Link to="/track">
            <button className="bg-transparent text-green-900 hover:text-white hover:bg-green-800 focus:shadow-outline border-2 border-green-800 font-medium py-2 px-4 rounded w-full mt-5 text-lg">
              Go to trackings page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
