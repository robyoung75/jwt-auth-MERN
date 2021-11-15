import mongoose from "mongoose";
import pkg from "validator";
import bcrypt from "bcrypt";

const { isEmail } = pkg;
const Schema = mongoose.Schema;

// user schema with validation
const User = new Schema({
  name: {
    type: String,
    required: [true, `Please enter a first and last name`],
    lowercase: true,
    maxlength: 255,
    minlength: 6,
  },

  email: {
    type: String,
    required: [true, `Please enter your email`],
    unique: true,
    lowercase: true,
    validate: [isEmail, `Please enter a valid email`],
  },

  password: {
    type: String,
    required: [true, `Please enter your password`],
    maxlength: 1024,
    minlength: [6, `Minimum password length 6 characters`],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// fire a function after doc saved to the database
// mongoose middleware or hook
User.post(`save`, function (doc, next) {
  console.log(`A new user was saved`, doc);
  next();
});

// fire a function before a doc is saved
// mongoose middleware or hook
// hash our password before we save to the database
User.pre(`save`, async function (next) {
  // console.log(`User about to be created and saved`, this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static login method for our User model

User.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

export default mongoose.model("user", User);
