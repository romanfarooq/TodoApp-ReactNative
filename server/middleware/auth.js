import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const isAuthenticatd = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if(!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default isAuthenticatd;