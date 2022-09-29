import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/sendToken.js";
import fs from "fs";

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const { avatar } = req.files;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 8 characters long" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myAvatar = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
      folder: "avatars",
    });

    fs.rmSync("./tmp", { recursive: true });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashPass,
      avatar: {
        public_id: myAvatar.public_id,
        url: myAvatar.secure_url,
      },
      otp,
      otpExpires: new Date(Date.now() + process.env.OTP_EXPIRES * 60 * 1000),
    });

    await sendMail(email, "OTP for registration", `Your OTP is ${otp}`);

    sendToken(user, 200, res, `OTP sent to ${email}, please verify`);

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

export const deleteAccount = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "Account deleted" });

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
        .json({ success: false, message: "Please enter both Email and Password" });
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
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "Logged out" });
};

export const addTask = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const user = await User.findById(req.user._id);

    user.tasks.push({
      title,
      description,
      completed: false,
      createdAt: new Date(Date.now()),
    });

    await user.save();

    res.status(200).json({ success: true, message: "Task added succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeTask = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.tasks = user.tasks.filter((task) => task._id.toString() !== id.toString());

    await user.save();

    res.status(200).json({ success: true, message: "Task removed succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.tasks = user.tasks.map((task) => {
      if (task._id.toString() === id.toString()) task.completed = !task.completed;
      return task;
    });

    await user.save();

    res.status(200).json({ success: true, message: "Task updated succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {

    const { name } = req.body;
    const { avatar } = req.files;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;

    if (avatar) {

      const image_id = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
        folder: "avatars",
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter both old and new password" });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 8 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);

    user.password = hashPass;

    await user.save();

    res.status(200).json({ success: true, message: "Password updated succesfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = new Date(Date.now() + process.env.OTP_EXPIRES * 60 * 1000);

    await user.save();

    await sendMail(email, "OTP for password reset", `Your OTP is ${otp}`);

    res.status(200).json({ success: true, message: `OTP sent to ${email}, please verify` });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {

    const otp = Number(req.body.otp);
    const newPassword = req.body.newPassword;

    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter both otp and new password" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 8 characters long" });
    }

    const user = await User.findOne({ resetPasswordOtp: otp }).select("+password");

    if (user.resetPasswordOtpExpires < new Date(Date.now())) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired, please try again" });
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);

    user.password = hashPass;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;

    await user.save();

    sendToken(user, 200, res, "Password reset successful");

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};