import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confirm from "./Confirm";
import Init from "./Init";
import { useStore } from "../store/store";

const Home = (props: any) => {
  const socket = props.socket;
  const [block, setBlock] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");

  // socket states
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showForm, setShowForm] = useState(false);
  const [selectData, setSelectData] = useState<any>({});
  const [confirmData, setConfirmData] = useState<any>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aadharNumber, setAadharNumber] = useState("");
  const setUsername = useStore((state) => state.setUsername);
  let username = useStore((state) => state.username);

  useEffect((): any => {
    socket.on("connect", () => {
      console.log("socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("response", (payload: any) => {
      console.log("payload in response: ", payload);
      if (payload.context.action === "search") {
        const data = payload.message.catalogue.providers;
        let items = [];
        for (const provider of data) {
          items.push(
            ...provider.items.map((item: any) => {
              return {
                id: item.id,
                bank_name: item.provider.id,
                block: item.tags.block,
                district: item.tags.district,
                loan_product: item.descriptor.name,
                maximum_loan_amt: item.price,
                interest_rate: item.tags.interest_rate,
                loan_tenure: item.tags.loan_tenure,
                processing_charges: item.tags.processing_charges,
              };
            })
          );
        }
        setData(
          items.sort((a, b) => {
            console.log("a: ", a);
            return a.id < b.id ? 0 : 1;
          })
        );
      } else if (payload.context.action === "select") {
        console.log("action: ", payload.context.action);
        setShowForm(true);
        setSelectData(payload);
        alert("Kindly, fill out the loan application form");
      } else if (payload.context.action === "init") {
        console.log("init response received");
        setConfirmData(payload);
        setShowConfirm(true);
      } else if (payload.context.action === "confirm") {
        alert(
          "Your application has been successfully submitted for processing!"
        );
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);

  return (
    <div>
      {username === null ? (
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
      ) : (
        <>
          <div>
            <div>
              <h3> Track the status of all your applications </h3>
              <Link to="/track">
                <button> Go to trackings page </button>
              </Link>
            </div>
            <h1> OR </h1>
            <div>
              <label> Block </label>
              <input type="text" onChange={(e) => setBlock(e.target.value)} />
            </div>
            <div>
              <label> District </label>
              <input
                type="text"
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div>
              <label> Bank Name </label>
              <input
                type="text"
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  socket.emit("search", {
                    query: "",
                    filters: {
                      bank_name: bankName,
                      block,
                      district,
                    },
                  });
                }}
              >
                Search
              </button>
            </div>
          </div>

          <div>
            <h1> Query Results are: </h1>
            <table className="customTable">
              <thead className="customTable">
                <tr className="customTable">
                  <th className="customTable">ID</th>
                  <th className="customTable">Bank Name</th>
                  <th className="customTable">Block</th>
                  <th className="customTable">District</th>
                  <th className="customTable">Loan Product</th>
                  <th className="customTable">Max Loan Amt</th>
                  <th className="customTable">Interest Rate</th>
                  <th className="customTable">Loan Tenure</th>
                  <th className="customTable">Processing Charges</th>
                  <th className="customTable"> Select </th>
                </tr>
              </thead>
              <tbody className="customTable">
                {data.map((item, key) => (
                  <tr className="customTable" key={key}>
                    <th className="customTable"> {item.id} </th>
                    <th className="customTable"> {item.bank_name} </th>
                    <th className="customTable"> {item.block} </th>
                    <th className="customTable"> {item.district} </th>
                    <th className="customTable"> {item.loan_product} </th>
                    <th className="customTable"> {item.maximum_loan_amt} </th>
                    <th className="customTable"> {item.interest_rate} </th>
                    <th className="customTable"> {item.loan_tenure} </th>
                    <th className="customTable"> {item.processing_charges} </th>
                    <th className="customTable">
                      {" "}
                      <button
                        id={`${item.id}.${item.bank_name}`}
                        key={item.bank_name}
                        onClick={(e: any) => {
                          console.log("select target: ", e.target);
                          const id = e.target.id.split(".")[0];
                          console.log("e.target: ", e.target);
                          console.log("id: ", id);
                          socket.emit("select", {
                            context: {
                              action: "select",
                              domain: "agriculture",
                              core_version: "0.9.3",
                              country: {
                                code: "IND",
                              },
                              city: {
                                code: "DEL",
                              },
                              timestamp: Date.now(),
                              transaction_id: Date.now(),
                              bap_id: 101,
                              bap_uri: "http://localhost:3000",
                              bpp_id: 301,
                              bpp_uri: "http://localhost:3002",
                            },
                            message: {
                              order: {
                                id: `order-${Date.now()}`,
                                state: "draft",
                                provider: {
                                  id: e.target.id.split(".")[1],
                                },
                                items: [
                                  {
                                    id: id,
                                    quantity: 1,
                                  },
                                ],
                                created_at: Date.now(),
                                update_at: Date.now(),
                              },
                            },
                          });
                        }}
                      >
                        Select
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            {showForm ? (
              <Init socket={socket} data={selectData} action="init" />
            ) : (
              <></>
            )}
            {showConfirm ? (
              <Confirm socket={socket} data={confirmData} />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
