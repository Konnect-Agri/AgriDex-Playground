import React, { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";

const Confirm = (props: any) => {
  const [data, setData] = useState<any>(null);
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    const data = props.data.message.order.provider.items;
    console.log("data in confirm: ", data);
    let items = [];
    items.push(
      ...data.map((item: any) => {
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
    console.log("items: ", items);
    setData(items[0]);

    console.log("loan_app: ", props.data.message.order.loan_application_doc);
  }, []);

  return (
    <div>
      <div className="confirmBox">
        <h1> Confirm Your Details! </h1>
        <h3> Selected Loan Product </h3>
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
            </tr>
          </thead>
          <tbody className="customTable">
            {data ? (
              <tr className="customTable">
                <th className="customTable"> {data.id} </th>
                <th className="customTable"> {data.bank_name} </th>
                <th className="customTable"> {data.block} </th>
                <th className="customTable"> {data.district} </th>
                <th className="customTable"> {data.loan_product} </th>
                <th className="customTable"> {data.maximum_loan_amt} </th>
                <th className="customTable"> {data.interest_rate} </th>
                <th className="customTable"> {data.loan_tenure} </th>
                <th className="customTable"> {data.processing_charges} </th>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <h3> Loan Application Form </h3>
        <JsonToTable json={props.data.message.order.loan_application_doc} />
        <button
          onClick={(e) => {
            props.data.context.action = "confirm";
            props.socket.emit("confirm", props.data);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirm;
