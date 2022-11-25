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
    <div>
      {!isLoading ? (
        <div>
          <h1> Your applications: </h1>
          <table className="customTable">
            <thead className="customTable">
              <tr className="customTable">
                <th className="customTable"> Order ID </th>
                <th className="customTable"> Check </th>
              </tr>
            </thead>
            <tbody className="customTable">
              {orders.map((order) => {
                return (
                  <tr className="customTable">
                    <td className="customTable"> {order.order_id} </td>
                    <td className="customTable">
                      <Link to={`/track/${order.order_id}`}>
                        <button> Check status </button>
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
    </div>
  );
};

export default Track;
