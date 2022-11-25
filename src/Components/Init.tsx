import React, { useEffect, useState } from "react";

const Init = (props: any) => {
  const formFiels = [
    "project_type",
    "district",
    "block",
    "branch",
    "loan_amount",
    "first_name",
    "middle_name",
    "last_name",
    "gender",
    "marital_status",
    "age",
    "mothers_name",
    "fathers_name",
    "date_of_birth",
    "educational_qualitfication",
    "PAN_Number",
    "Aadhar_Number",
    "Address",
    "Pin_Code",
    "Phone_number",
    "Email_Id",
    "Permanent_Address",
    "Permanent_Pin_Code",
    "Permanent_Phone_number",
    "Permanent_Email_Id",
    "Agricultural_Income_Source",
    "Agricultural_Income",
    "Other_Income_Source",
    "Other_Income",
    "Total_Income",
    "Guarantor_Name",
    "Relationship_with_Guarantor",
    "Mobile_number_of_the_guarantor",
    "Email_ID_of_the_Guarantor",
    "PAN_card_number_of_guarantor",
  ];

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
      <div>
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
                <th className="customTable">
                  {" "}
                  {selectedItem.maximum_loan_amt}{" "}
                </th>
                <th className="customTable"> {selectedItem.interest_rate} </th>
                <th className="customTable"> {selectedItem.loan_tenure} </th>
                <th className="customTable">
                  {" "}
                  {selectedItem.processing_charges}{" "}
                </th>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h1> Loan Application Form </h1>
        <div></div>
        <div>
          {formFiels.map((field, index) => {
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
                      // const newForm = formData;
                      // newForm[field] = e.target.value;
                      // setFormData({ ...newForm });
                      setFormData({ ...formData, [field]: e.target.value });
                      console.log("form data: ", formData);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button
            type="submit"
            onClick={(e: any) => {
              e.preventDefault();
              console.log("e: ", e.target);
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
                    educatioal_qualification:
                      formData.educational_qualitfication,
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
                    agricultural_income_source:
                      formData.Agricultural_Income_Source,
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
              console.log("form to emit: ", formToEmit);
              const payload = props.data;
              payload.context.action = "init";
              payload.message.order.loan_application_doc = formToEmit;
              console.log("payload: ", payload);
              props.socket.emit(props.action, payload);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Init;
