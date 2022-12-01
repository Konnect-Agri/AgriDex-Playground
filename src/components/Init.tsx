import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Init = (props: any) => {
  const navigate = useNavigate();
  const formFiels = [
    "project_type",
    "district",
    "block",
    "branch",
    "loan_amount",
    "first_name",
    "middle_name",
    "last_name",
    // "gender",
    // "marital_status",
    // "age",
    // "mothers_name",
    // "fathers_name",
    // "date_of_birth",
    // "educational_qualitfication",
    // "PAN_Number",
    // "Aadhar_Number",
    // "Address",
    // "Pin_Code",
    // "Phone_number",
    // "Email_Id",
    // "Permanent_Address",
    // "Permanent_Pin_Code",
    // "Permanent_Phone_number",
    // "Permanent_Email_Id",
    // "Agricultural_Income_Source",
    // "Agricultural_Income",
    // "Other_Income_Source",
    // "Other_Income",
    // "Total_Income",
    // "Guarantor_Name",
    // "Relationship_with_Guarantor",
    // "Mobile_number_of_the_guarantor",
    // "Email_ID_of_the_Guarantor",
    // "PAN_card_number_of_guarantor",
  ];

  const handleClick = (e: any) => {
    e.preventDefault();
    const formToEmit = {
      application_basic_info: {
        sector: formData.sector,
        project_type: formData.project_type,
        district: formData.district,
        block: formData.block,
        amount: formData.loan_amount,
      },
      applicant_details: {
        basic_details: {
          name:
            formData.first_name +
            " " +
            formData.middle_name +
            " " +
            formData.last_name,
          gender: formData.gender,
          dob: formData.date_of_birth,
          tags: {
            marital_status: formData.marital_status,
            fathers_name: formData.fathers_name,
            mothers_name: formData.mothers_name,
          },
          pan_card_number: formData.PAN_Number,
          aadhar_number: formData.Aadhar_Number,
          educatioal_qualification: formData.educational_qualitfication,
        },
        temporary_correspondence_details: {
          address: formData.Address,
          //{
          // building: "Sky Towers",
          // street: "Street 1",
          // locality: "Locality 1",
          // ward: "Ward 1",
          // city: "Angul",
          // state: "Odisha",
          // country: "INDIA",
          // area_code: "124001",
          // },
          contact: {
            phone: formData.Phone_number,
            email: formData.Email_id,
          },
        },
        permanent_correspondence_details: {
          address: formData.Permanent_Address,
          //{
          // building: "Sky Towers",
          // street: "Street 1",
          // locality: "Locality 1",
          // ward: "Ward 1",
          // city: "Angul",
          // state: "Odisha",
          // country: "INDIA",
          // area_code: "124001",
          // },
          contact: {
            phone: formData.Permanent_Phone_number,
            email: formData.Permanent_Email_id,
          },
        },
        income_details: {
          agricultural_income_source: formData.Agricultural_Income_Source,
          agricultural_income: formData.Agricultural_Income,
          other_income_source: formData.Other_Income_Source,
          other_income: formData.Other_Income,
          total_income: formData.Total_Income,
        },
        guarantor_details: {
          name: formData.Guarantor_Name,
          relationship: formData.Relationship_with_Guarantor,
          mobile: formData.Mobile_number_of_the_guarantor,
          email: formData.Email_ID_of_the_Guarantor,
          pan_card_number: formData.PAN_card_number_of_guarantor,
        },
      },
    };
    const payload = props.data;
    payload.context.action = "init";
    payload.message.order.loan_application_doc = formToEmit;
    props.socket.emit(props.action, payload);
    navigate("/loanDetails");
  };

  type FORM_DATA = {
    project_type: string;
    district: string;
    block: string;
    branch: string;
    loan_amount: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    marital_status: string;
    age: string;
    mothers_name: string;
    fathers_name: string;
    date_of_birth: string;
    educational_qualitfication: string;
    PAN_Number: string;
    Aadhar_Number: string;
    Address: string;
    Pin_Code: string;
    Phone_number: string;
    Email_Id: string;
    Permanent_Address: string;
    Permanent_Pin_Code: string;
    Permanent_Phone_number: string;
    Permanent_Email_Id: string;
    Agricultural_Income_Source: string;
    Agricultural_Income: string;
    Other_Income_Source: string;
    Other_Income: string;
    Total_Income: string;
    Guarantor_Name: string;
    Relationship_with_Guarantor: string;
    Mobile_number_of_the_guarantor: string;
    Email_ID_of_the_Guarantor: string;
    PAN_card_number_of_guarantor: string;
  };

  /*
  const sample_loan_application_doc = {
    application_basic_info: {
      sector: "agriculture",
      project_type: "crop",
      district: "ANGUL",
      block: "ANGUL",
      amount: "500000",
    },
    applicant_details: {
      basic_details: {
        name: "Jane Doe",
        gender: "F",
        dob: "DD-MM-YYYY",
        tags: {
          marital_status: "married",
          fathers_name: "Jake Blow",
          mothers_name: "Maria Blow",
        },
        pan_card_number: "XXXXX1234X",
        aadhar_number: "XXXX-XXXX-XXXX",
        educatioal_qualification: "Graduate",
      },
      temporary_correspondence_details: {
        address: {
          building: "Sky Towers",
          street: "Street 1",
          locality: "Locality 1",
          ward: "Ward 1",
          city: "Angul",
          state: "Odisha",
          country: "INDIA",
          area_code: "124001",
        },
        contact: {
          phone: "1234567890",
          email: "sample@example.com",
        },
      },
      permanent_correspondence_details: {
        address: {
          building: "Sky Towers",
          street: "Street 1",
          locality: "Locality 1",
          ward: "Ward 1",
          city: "Angul",
          state: "Odisha",
          country: "INDIA",
          area_code: "124001",
        },
        contact: {
          phone: "1234567890",
          email: "sample@example.com",
        },
      },
      income_details: {
        agricultural_income_source: "crop trading",
        agricultural_income: "100000",
        other_income_source: ["salary"],
        other_income: "50000",
        total_income: "150000",
      },
      guarantor_details: {
        name: "Alexander Doe",
        relationship: "brother",
        mobile: "1234567890",
        email: "sample@example.com",
        pan_card_number: "XXXXX1234X",
      },
    },
  };
  */
  const { socket, data } = props;

  const [formData, setFormData] = useState<any>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  useEffect(() => {
    console.log("data in useeffect: ", data);
    setSelectedItem(
      data.message.order.provider.items.map((item: any) => {
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
      })[0]
    );
  }, []);

  return (
    <div>
      {/* <div>
        <h1> You have selected the following loan product! </h1>
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
            {selectedItem ? (
              <tr className="customTable">
                <th className="customTable"> {selectedItem.id} </th>
                <th className="customTable"> {selectedItem.bank_name} </th>
                <th className="customTable"> {selectedItem.block} </th>
                <th className="customTable"> {selectedItem.district} </th>
                <th className="customTable"> {selectedItem.loan_product} </th>
                <th className="customTable">{selectedItem.maximum_loan_amt}</th>
                <th className="customTable"> {selectedItem.interest_rate} </th>
                <th className="customTable"> {selectedItem.loan_tenure} </th>
                <th className="customTable">
                  {selectedItem.processing_charges}
                </th>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div> */}
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-white text-4xl mb-4 font-bold mt-10">
          Loan Application Form
        </h1>
        <div className="bg-white bg-opacity-60 p-11 mb-10 w-2/5">
          {formFiels.map((field, index) => {
            return (
              <div key={index} className="mb-2 w-full">
                <div>
                  <label
                    htmlFor={field}
                    className="block text-gray-700 text-md font-regular mb-2"
                  >
                    {" "}
                    {field}{" "}
                  </label>
                </div>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id={field}
                    onChange={(e: any) => {
                      setFormData({ ...formData, [field]: e.target.value });
                      console.log("form data: ", formData);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full text-lg"
            type="submit"
            onClick={(e: any) => handleClick(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Init;
