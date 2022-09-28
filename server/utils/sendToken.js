import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res, message) => {

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 24 * 1000,
  });

  const { password, createdAt, otp, otpExpires, ...userData } = user._doc;

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  };

  res
    .cookie("token", token, options)
    .status(statusCode)
    .json({ success: true, message, user: userData });
};

export default sendToken;