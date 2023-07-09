import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const naviget = useNavigate();
  const postRe = (e) => {
    e.preventDefault();
    axios
      .post("https://altarefi.icrcompany.net/api/login", {
        email: email,
        password: password,
      })
      .then((auth) => {
        console.log(auth.data.token);
        naviget("/", { replace: true });
        window.localStorage.setItem("token", auth.data.token);
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  };

  return (
    <div className="login text-center">
      <div className="py-1">
        <img src="./logo.png" alt="" />
      </div>
      <div className="form">
        <h1>LOG IN</h1>
        <div>
          <div className="input">
            <span>Email</span>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <span>Password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`text-danger ${error ? "" : "d-none"}`}>
            The password or email is incorrect
          </div>
          <button className="button text-light fs-4" onClick={postRe}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
