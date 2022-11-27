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
    <>
      <div>
        <div>
          <h1> Track the status of all your applications </h1>
          <Link to="/track">
            <button> Go to trackings page </button>
          </Link>
        </div>
        <h1> OR </h1>
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Block
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                type="text"
                onChange={(e) => setBlock(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                District
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                type="text"
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Bank
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                type="text"
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
