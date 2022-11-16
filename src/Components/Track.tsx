import React, { useState } from "react";
import Axios from "axios";
import Init from "./Init";

const Track = (props: any) => {
  const [order_id, setOrderId] = useState<string>("");
  const [tracking, setTracking] = useState<any>(null);
  const [showTracking, setShowTracking] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  return (
    <div>
      <div>
        <label htmlFor="order_id"> order_id </label>
        <input type="text" name="order_id" />
      </div>
      <button
        type="submit"
        onClick={() => {
          Axios({
            method: "POST",
            url: "http://localhost:3004/track",
            withCredentials: true,
            data: {
              message: {
                order_id: order_id,
              },
            },
          }).then((res) => {
            Axios({ method: "GET", url: res.data.url }).then((res) =>
              setData(res.data)
            );
            setTracking(res.data);
          });
        }}
      >
        Submit
      </button>
      <div>
        {showTracking ? (
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th> Status </th>
                    <th> Review </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {tracking.status} </td>
                    <td> {tracking.url} </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <Init socket={props.socket} data={data} action="update" />{" "}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Track;
