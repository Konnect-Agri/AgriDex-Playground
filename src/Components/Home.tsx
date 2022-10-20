import { useEffect, useState } from "react";
import Axios from "axios";

const Home = () => {
  const [block, setBlock] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  return (
    <div>
      <div>
        <div>
          <label> Block </label>
          <input type="text" onChange={(e) => setBlock(e.target.value)} />
        </div>
        <div>
          <label> District </label>
          <input type="text" onChange={(e) => setDistrict(e.target.value)} />
        </div>
        <div>
          <label> Bank Name </label>
          <input type="text" onChange={(e) => setBankName(e.target.value)} />
        </div>
        <div>
          <button
            onClick={() => {
              Axios({
                method: "POST",
                url: "http://localhost:3000/search",
                data: {
                  message: {
                    block,
                    district,
                    bankName,
                  },
                },
              }).then((res) => setData(res.data.data.credit_products));
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <h1> Query Results are: </h1>
        <table>
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
          {data.map((item) => (
            <tr>
              <th> {item.id} </th>
              <th> {item.bank_name} </th>
              <th> {item.block} </th>
              <th> {item.district} </th>
              <th> {item.loan_product} </th>
              <th> {item.maximum_loan_amt} </th>
              <th> {item.interest_rate} </th>
              <th> {item.loan_tenure} </th>
              <th> {item.processing_charges} </th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
