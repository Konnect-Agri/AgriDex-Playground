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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Bank Name</th>
              <th>Block</th>
              <th>District</th>
              <th>Loan Product</th>
              <th>Max Loan Amt</th>
              <th>Interest Rate</th>
              <th>Loan Tenure</th>
              <th>Processing Charges</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr>
                <th> {data.id} </th>
                <th> {data.bank_name} </th>
                <th> {data.block} </th>
                <th> {data.district} </th>
                <th> {data.loan_product} </th>
                <th> {data.maximum_loan_amt} </th>
                <th> {data.interest_rate} </th>
                <th> {data.loan_tenure} </th>
                <th> {data.processing_charges} </th>
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
