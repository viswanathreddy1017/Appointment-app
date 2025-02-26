import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token =req.cookies.adminToken;
  if(!token){
    return next(new ErrorHandler("Admin not authenticated", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if(req.user.role !== "Admin"){
    return next(new ErrorHandler(`${req.user.role}  not authorized for this resource `, 403));
  }
  next();
});

export const isStudentAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token =req.cookies.studentToken;
  if(!token){
    return next(new ErrorHandler("Student not authenticated", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if(req.user.role !== "Student"){
    return next(new ErrorHandler(`${req.user.role}  not authorized for this resource `, 403));
  }
  next();
});



/*
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("Authorization");

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.split(" ")[1], "your_jwt_secret"); // Use your secret key
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
module.exports = function (req, res, next) {
    const token = req.header("x-api-key"); // Use the correct header here
    
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };

  */
 