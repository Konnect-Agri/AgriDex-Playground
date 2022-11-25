import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/store";
import Axios from "axios";
import { JsonToTable } from "react-json-to-table";

const UpdateApplication = (props: any) => {
  const { orderId } = useParams(); // path param

  const [status, setStatus] = useState<any>(null);
  const [updateTargets, setUpdateTargets] = useState<string[]>([]);
  const [formData, setFormData] = useState<{}>({});
  const [oldFormData, setOldFormData] = useState<{}>({});

  const socket = props.socket;

  useEffect(() => {
    console.log("orderId: ", orderId);
    socket.emit("track", { order_id: orderId });

    socket.on("response", (payload: any) => {
      console.log("payload: ", payload);
      if (payload.context.action === "track") {
        console.log(payload.message);
        setStatus(payload.message.status);
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
  const username = useStore((state) => state.username);
  return (
    <div>
      <h2> Application Processing Status: {status} </h2>
      <div>
        <div>
          <h4> Current Form </h4>
          <JsonToTable json={oldFormData} />
        </div>
        <h4> Fields to Update </h4>
        <div>
          <div>
            {updateTargets.map((field, index) => {
              return (
                <div key={index}>
                  <div>
                    <label htmlFor={field}> {field} </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id={field}
                      onChange={(e: any) => {
                        setFormData({
                          ...formData,
                          [field]: e.target.value,
                        });
                        console.log("form data: ", formData);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              type="submit"
              onClick={(e) => {
                const payload = {
                  oldFormData,
                  updates: formData,
                };
                socket.emit("update", payload);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateApplication;
