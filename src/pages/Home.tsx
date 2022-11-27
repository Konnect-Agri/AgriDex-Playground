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
          <h1 className="text-3xl text-gray-800 font-bold mb-8 text-center">
            Search the banks available for the loan
          </h1>
        </div>
        <form className="mt-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-medium mb-2">
              Block
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setBlock(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-medium mb-2">
              District
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-medium mb-2">
              Bank Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full text-lg"
              type="button"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </form>
        <Link to="/track">
          <button className="bg-transparent text-green-700 hover:text-white hover:bg-green-700 focus:shadow-outline border-2 border-green-700 font-medium py-2 px-4 rounded w-full mt-5 text-lg">
            Go to trackings page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
