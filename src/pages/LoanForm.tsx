import { ReactElement, useEffect, useState } from "react";
import Init from "../components/Init";
import swal from "sweetalert";

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
    <Init socket={socket} data={selectData} action="init" />
  ) : (
    <></>
  );
};

export default LoanForm;
