import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Verification.css";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const { resetPasswordTokeen } = useParams();
  console.log(resetPasswordTokeen);
  return <>ResetPassword</>;
};

export default ResetPassword;
