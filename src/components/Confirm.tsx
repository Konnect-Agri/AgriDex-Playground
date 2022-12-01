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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="my-16">
        <h1 className="text-white text-4xl mb-4 font-bold text-center">
          Confirm your details
        </h1>
        <table className="table-auto font-regular bg-white bg-opacity-70 rounded">
          <thead className="bg-gray-200 px-4">
            <tr className="customTable">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Bank Name</th>
              <th className="py-3 px-4">Block</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">Loan Product</th>
              <th className="py-3 px-4">Max Loan Amt</th>
              <th className="py-3 px-4">Interest Rate</th>
              <th className="py-3 px-4">Loan Tenure</th>
              <th className="py-3 px-4">Processing Charges</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr className="text-center border">
                <td className="py-3"> {data.id} </td>
                <td className="py-3"> {data.bank_name} </td>
                <td className="py-3"> {data.block} </td>
                <td className="py-3"> {data.district} </td>
                <td className="py-3"> {data.loan_product} </td>
                <td className="py-3"> {data.maximum_loan_amt} </td>
                <td className="py-3"> {data.interest_rate} </td>
                <td className="py-3"> {data.loan_tenure} </td>
                <td className="py-3"> {data.processing_charges} </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <JsonToTable json={props.data.message.order.loan_application_doc} />
        <button
          className="bg-green-800 hover:bg-green-900 text-white font-medium py-1 px-4 rounded focus:outline-none focus:shadow-outline my-2 w-full text-lg"
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
