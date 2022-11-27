import { useEffect, useState } from "react";
import Confirm from "../components/Confirm";
import swal from "sweetalert";

const LoanForm = (props: any) => {
  const { socket } = props;
  const [isConnected, setIsConnected] = useState(socket.connected);
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
      if (payload.context.action === "init") {
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
  return showConfirm && <Confirm socket={socket} data={confirmData} />;
};

export default LoanForm;
