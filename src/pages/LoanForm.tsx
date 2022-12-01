import { ReactElement, useEffect, useState } from "react";
import Init from "../components/Init";
import swal from "sweetalert";

const parseAPIData = (sampleObj: any) => {
  const parsedForm: any = {};
  parsedForm["dob"] = sampleObj.applicant_details.basic_details.dob;
  parsedForm["name"] = sampleObj.applicant_details.basic_details.name;
  parsedForm["fathers_name"] =
    sampleObj.applicant_details.basic_details.tags.fathers_name;
  parsedForm["marital_status"] =
    sampleObj.applicant_details.basic_details.tags.marital_status;
  parsedForm["address"] =
    sampleObj.applicant_details.permanent_correspondence_details.address;
  parsedForm["phone"] =
    sampleObj.applicant_details.permanent_correspondence_details.contact.phone;
  parsedForm["district"] = sampleObj.application_basic_info.district;
  parsedForm["gender"] = sampleObj.applicant_details.basic_details.gender;
  parsedForm["aadhar_number"] =
    sampleObj.applicant_details.basic_details.aadhar_number;

  return parsedForm;
};

const LoanForm = (props: any) => {
  const { socket } = props;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showForm, setShowForm] = useState(false);
  const [selectData, setSelectData] = useState<any>({});

  useEffect((): any => {
    socket.on("connect", () => {
      console.log("socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("response", (payload: any) => {
      if (payload.context.action === "select") {
        console.log("action: ", payload.context.action);
        setShowForm(true);
        setSelectData(payload);
        swal({
          icon: "info",
          text: "Kindly, fill out the loan application form of selected bank",
        });
      } else if (payload.context.action === "init") {
        console.log("init response received");
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);
  return showForm ? (
    <Init
      socket={socket}
      parsedData={parseAPIData(selectData.message.order.loan_application_doc)}
      data={selectData}
      action="init"
    />
  ) : (
    <></>
  );
};

export default LoanForm;
