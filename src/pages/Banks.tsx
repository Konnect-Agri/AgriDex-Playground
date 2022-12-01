import { useEffect, useState } from "react";
import Confirm from "../components/Confirm";
import { useNavigate } from "react-router-dom";

const Banks = (props: any) => {
  const { socket } = props;
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [confirmData, setConfirmData] = useState<any>({});
  const [showConfirm, setShowConfirm] = useState(false);

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
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);

  const handleClick = (e: any) => {
    const id = e.target.id.split(".")[0];
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
    navigate("/loanForm");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-white text-4xl mb-4 font-bold"> Query Results</h1>
      <table className="table-auto font-regular bg-white bg-opacity-70 rounded">
        <thead className="bg-gray-200 px-4">
          <tr>
            <th className="py-3 px-4">S.NO</th>
            <th className="py-3 px-4">Bank Name</th>
            <th className="py-3 px-4">Block</th>
            <th className="py-3 px-4">District</th>
            <th className="py-3 px-4">Loan Product</th>
            <th className="py-3 px-4">Max Loan Amt</th>
            <th className="py-3 px-4">Interest Rate</th>
            <th className="py-3 px-4">Loan Tenure</th>
            <th className="py-3 px-4">Processing Charges</th>
            <th className="py-3 px-4"> Select </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key} className="text-center border borrder-gray-500">
              <th className="py-3"> {key + 1} </th>
              <td className="py-3"> {item.bank_name} </td>
              <td className="py-3"> {item.block} </td>
              <td className="py-3"> {item.district} </td>
              <td className="py-3"> {item.loan_product} </td>
              <td className="py-3"> {item.maximum_loan_amt} </td>
              <td className="py-3"> {item.interest_rate} </td>
              <td className="py-3"> {item.loan_tenure} </td>
              <td className="py-3"> {item.processing_charges} </td>
              <td className="px-4">
                <button
                  id={`${item.id}.${item.bank_name}`}
                  key={item.bank_name}
                  onClick={(e: any) => handleClick(e)}
                  className="bg-green-800 hover:bg-green-900 text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline my-2 w-full text-lg"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Banks;
