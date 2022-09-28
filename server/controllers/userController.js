import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    // const { avatar } = req.files;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashPass,
      avatar: {
        public_id: "public_id",
        url: "url",
      },
      otp,
      otpExpires: new Date(Date.now() + process.env.OTP_EXPIRES * 60 * 1000),
    });

    await sendMail(email, "OTP for registration", `Your OTP is ${otp}`);

    sendToken(user, 200, res, "OTP sent to your email, please verify");

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verify = async (req, res) => {
  try {

    const otp = Number(req.body.otp);

    const user = await User.findById(req.user._id);

    if (user.otpExpires < new Date(Date.now())) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired, please try again" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    sendToken(user, 200, res, "Account verified");

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter both Email and Password",
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Inavlid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Inavlid Email or Password" });
    }

    sendToken(user, 200, res, "Login successful");

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {

  res.clearCookie("token", { expires: new Date(Date.now()) });

  res.status(200).json({ success: true, message: "Logged out" });

};
