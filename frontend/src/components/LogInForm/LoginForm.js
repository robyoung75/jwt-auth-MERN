import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/form.css";
import { useState } from "react";

function LogInForm({ setUser }) {
  const [authEmail, setAuthEmail] = useState("");
  const [authPwd, setAuthPwd] = useState("");
  const [logInError, setLogInError] = useState();
  let navigate = useNavigate();

  const handleAuthEmail = (e) => {
    e.preventDefault();
    setAuthEmail(e.target.value);
  };

  const handleAuthPwd = (e) => {
    e.preventDefault();
    setAuthPwd(e.target.value);
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    setLogInError("");

    console.log(authEmail);

    let user = { email: authEmail, password: authPwd };
    console.log(user);

    try {
      const response = await fetch("http://localhost:8001/login", {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);

      if (data.errors) setLogInError(data.errors);
      if (data.user) {
        console.log(data.user, "SETUP THE REDIRECT TO WHEREVER");
        setAuthEmail("");
        setAuthPwd("");
        setUser(user.email);
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <form className="auth__form">
      <h2>Log in</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={authEmail}
        required
        onChange={handleAuthEmail}
      />
      <div className="email error">{logInError ? logInError.email : null}</div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={authPwd}
        required
        onChange={handleAuthPwd}
      />
      <div className="password error">
        {logInError ? logInError.password : null}
      </div>
      <button onClick={handleLogInSubmit}>Log in</button>
    </form>
  );
}

export default LogInForm;
