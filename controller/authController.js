import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { fullName, email, password, phone, address, answer } = req.body;
    if (!fullName) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "ALready a user, now login.",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save the user
    const user = await new userModel({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registering",
      error,
    });
  }
};

// Post Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validating Id and password

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID and Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Emsail is not registererd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "INavlid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login SuccessFully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// test
export const testController = (req, res) => {
  try {
    res.send("protecteted ROuter");
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
};
