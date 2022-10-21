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
                    bank_name: bankName,
                  },
                },
              }).then((res) => {
                console.log("response: ", res.data);
                const data = res.data.message.catalogue.providers;
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
                setData(items);
              });
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
