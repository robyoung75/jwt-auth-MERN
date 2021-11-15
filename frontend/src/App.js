import Navbar from "./components/Nav/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import "./App.css";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LoginForm";
import { useState } from "react";

function App(props) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState();

  console.log(props);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/logout", {
        method: "GET",
        // body: JSON.stringify(user),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setUser("");
    } catch (error) {}
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <div className="app">
              <Navbar user={user} />
              <div className="app__body">
                <LogInForm setUser={setUser} />
              </div>
            </div>
          }
        ></Route>

        <Route
          exact
          path="/signup"
          element={
            <div className="app">
              <Navbar user={user} />
              <div className="app__body">
                <SignUpForm setUser={setUser} />
              </div>
            </div>
          }
        >
          {" "}
        </Route>
        <Route
          exact
          path="/"
          element={
            <div className="app">
              <Navbar user={user} />
              <div className="app__body">
                {" "}
                <h2>MERN JWT Authentication</h2>
                {user ? <button onClick={handleLogOut}>Log out</button> : null}
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
