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
