import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../store/store";

const Track = (props: any) => {
  const { orderId } = useParams();
  const [status, setStatus] = useState<any>(null);
  const [formURL, setFormURL] = useState<any>(null);
  const [updateTargets, setUpdateTargets] = useState<string[]>([]);
  const [formData, setFormData] = useState<{}>({});
  const [oldFormData, setOldFormData] = useState<{}>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const socket = props.socket;

  const username = useStore((state) => state.username);

  useEffect(() => {
    console.log("orderId: ", orderId);
    // socket.emit("track", { order_id: orderId });
    Axios({
      method: "POST",
      url: "http://localhost:3003/orders",
      data: {
        client_id: username,
      },
    }).then((res) => {
      console.log("user trackings: ", res.data);
      setOrders(res.data.data.order_client_mappings);
      setIsLoading(false);
    });

    socket.on("response", (payload: any) => {
      console.log("payload: ", payload);
      if (payload.context.action === "track") {
        console.log(payload.message);
        setStatus(payload.message.status);
        setFormURL(payload.message.url);
      }

      if (payload.message.url) {
        Axios({
          method: "GET",
          url: payload.message.url,
        }).then((res) => {
          const targets =
            res.data.data.order_tracking_details[0].update_targets;
          console.log("fetched targets: ", targets);
          setUpdateTargets(targets.split(","));
          setOldFormData(res.data.data.loan_applications[0]);
        });
      }
    });
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-screen my-16">
          <h1 className="text-white text-4xl mb-4 font-bold">
            Your Applications
          </h1>
          <table className="table-auto font-regular bg-white bg-opacity-70 rounded">
            <thead className="bg-gray-200 px-11">
              <tr>
                <th className="py-3 px-4"> Order ID </th>
                <th className="py-3 px-4"> Check </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr className="text-center border">
                    <td className="py-3 px-20"> {order.order_id} </td>
                    <td className="py-3  px-20">
                      <Link to={`/track/${order.order_id}`}>
                        <button className="bg-green-800 hover:bg-green-900 text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline my-2 w-full text-lg">
                          {" "}
                          Check status{" "}
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Track;
