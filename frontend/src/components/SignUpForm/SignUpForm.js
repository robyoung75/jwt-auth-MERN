import React from "react";
import "../../css/form.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm({ setUser }) {
  // SignUpForm state
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [reqError, setReqError] = useState();
  let navigate = useNavigate();

  // SignUpForm Handlers
  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleUserEmail = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    e.preventDefault();
    setUserPassword(e.target.value);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    setReqError("");

    let newUser = { name: userName, email: userEmail, password: userPassword };
    console.log(newUser);

    try {
      const response = await fetch("http://localhost:8001/new_user", {
        method: "POST",
        body: JSON.stringify(newUser),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (data.errors) setReqError(data.errors);
      if (data.newUser)
        console.log(data.newUser, "SETUP THE REDIRECT TO WHEREVER");
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUser(newUser.email);
      navigate("/");
    } catch (error) {}
  };
  return (
    <form className="auth__form">
      <h2>Sign up</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={userName}
        required
        onChange={handleUserName}
      />
      <div className="name error"></div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={userEmail}
        required
        onChange={handleUserEmail}
      />
      <div className="email error">{reqError ? reqError.email : null}</div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={userPassword}
        required
        onChange={handleUserPassword}
      />
      <div className="password error">
        {reqError ? reqError.password : null}
      </div>
      <button onClick={handleUserSubmit}>Sign up</button>
    </form>
  );
}

export default SignUpForm;
