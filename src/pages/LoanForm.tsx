import { useEffect, useState } from "react";
import Init from "../components/Init";
import swal from "sweetalert";

const LoanForm = (props: any) => {
  const { socket } = props;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showForm, setShowForm] = useState(false);
  const [selectData, setSelectData] = useState<any>({});
  const [confirmData, setConfirmData] = useState<any>({});
  const [showConfirm, setShowConfirm] = useState(false);

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
          text: "Kindly, fill out the loan application form",
        });
      } else if (payload.context.action === "init") {
        console.log("init response received");
        setConfirmData(payload);
        setShowConfirm(true);
      } else if (payload.context.action === "confirm") {
        swal({
          icon: "success",
          text: "Your application has been successfully submitted for processing!",
        });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("response");
    };
  }, []);
  return showForm && <Init socket={socket} data={selectData} action="init" />;
};

export default LoanForm;
