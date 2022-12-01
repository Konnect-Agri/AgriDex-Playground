import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/store";
import Axios from "axios";
import { JsonToTable } from "react-json-to-table";

const TrackDetails = (props: any) => {
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
      if (payload.context.action === "update") {
        console.log("payload.message", payload.message);
        setStatus(payload.message.status);
        alert("update submitted successfully");
      }

      if (payload.message.url) {
        Axios({
          method: "GET",
          url: payload.message.url,
        }).then((res) => {
          const targets =
            res.data.data.order_tracking_details[0].update_targets;
          console.log("fetched targets: ", targets);
          console.log("old data: ", res.data.data);
          console.log(
            "res.data.data.loan_applications[0]: ",
            res.data.data.loan_applications[0].order_details
          );
          if (targets) setUpdateTargets(targets.split(","));
          setOldFormData(res.data.data.loan_applications[0].order_details);
        });
      }
    });
  }, []);
  const username = useStore((state) => state.username);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-white text-4xl mb-4 font-bold mt-16">
        {" "}
        Application Processing Status {status}
      </h1>
      <div className="bg-white shadow-md bg-opacity-70 px-8 py-10 w-2/5 mb-16">
        <div>
          <div>
            <h4> Current Form </h4>
            <JsonToTable json={oldFormData} />
          </div>
          <h4 className="font-regulat mt-6"> Fields to Update </h4>
          <div>
            <div>
              {updateTargets.map((field, index) => {
                return (
                  <div key={index}>
                    <div>
                      <label
                        htmlFor={field}
                        className="block text-gray-700 text-md font-medium mb-2 my-4"
                      >
                        {" "}
                        {field}{" "}
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        id={field}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-full text-lg"
                type="submit"
                onClick={(e) => {
                  console.log("old form data in event handler: ", oldFormData);

                  const payload = {
                    order: oldFormData,
                    updates: formData,
                  };
                  console.log("payload in event handler: ", payload);
                  socket.emit("update", payload);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
