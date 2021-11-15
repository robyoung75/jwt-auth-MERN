import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { requiresAuth, checkUser } from "./middleware/authMiddleware.js";

dotenv.config();

// import routes
import { authRoutes } from "./routes/authRoutes.js";

// configure app
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url = process.env.DB_CONNECT;

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(Cors(corsOptions));

// db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection etablished successfully");
});

// routes
// "*" applies to every route
app.get("*", checkUser);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World 🙌" });
});

// test route route for secure routes
app.get("/secure", requiresAuth, (req, res) => {
  return res.json({ message: "Secure route" });
});

app.use(authRoutes);

// cookies example only
// app.get(`/set-cookies`, (req, res) => {
//   // setHeader if you don't have cookie parser
//   // res.setHeader(`Set-Cookie`, `newUser=true`);
//   res.cookie(`newUser`, false);
//   // learn https secure....
//   res.cookie(`isEmployee`, true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send(`You have the cookies`);
// });

// app.get(`/read-cookies`, (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.isEmployee);

//   res.json(cookies);
// });

//listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} let's go...`);
});
