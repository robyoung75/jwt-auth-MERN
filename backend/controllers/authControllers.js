import User from "../models/user.js";
import jwt from "jsonwebtoken";

// error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", name: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = `that email is already registered`;
    return errors;
  }

  // validataion errors
  if (err.message.includes(`user validation failed`)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create JWT
//jwt token expires expects a time is seconds so we have 3-days in seconds
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// user sign in
const signIn_POST = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, email: user.email });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// user sign out
const signOut_GET = (req, res) => {
  // empty string replaces existing jwt hence logging out
  // expires in 1ms
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

// data posts and updates
const postsAll_GET = (req, res) => {
  res.json({
    message: `Here are all of your posts from postsAll_GET by authRoutes controller`,
  });
};

const post_POST = (req, res) => {
  res.json({ message: `Successful Post by post_POST authRoutes controller` });
};

const postUpdate_PUT = (req, res) => {
  res.json({
    message: `Successful Post Update by postUpdate_PUT authRoutes controller`,
  });
};

// new user
const newUser_POST = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const newUser = await User.create({ email, password, name });
    const token = createToken(newUser._id);
    console.log(token);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ newUser: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export {
  signIn_POST,
  signOut_GET,
  post_POST,
  postUpdate_PUT,
  newUser_POST,
  postsAll_GET,
};
