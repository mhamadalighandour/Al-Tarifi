import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const naviget = useNavigate();

  // const token =
  const postRe = (e) => {
    if (newPassword === confirmPassword) {
      e.preventDefault();
      axios
        .post("https://altarefi.icrcompany.net/api/change-password", {
          password: newPassword,
        }
        ,{headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}
        )
        .then((auth) => {
          if (auth) {
            naviget("/");
          }
        })
        .catch((e) => {
          setError(true);
        });
    } else {
      setError(true);
    }
  };
  return (
    <div className="login text-center ">
      <div className="py-1">
        <img src="./logo.png" alt="" />
      </div>
      <div className="form">
        <h1 className="my-5 fs-2 p-0">Change Password</h1>
        <div>
          <div className="input">
            <span>New Password</span>
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <span>Confirm Password</span>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={`text-danger ${error ? "" : "d-none"}`}>
            password does not match
          </div>
          <button className="button text-light fs-4" onClick={postRe}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
