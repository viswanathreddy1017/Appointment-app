import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import {User} from "../models/User.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const studentRegister = catchAsyncErrors(async (req, res, next) => {
    const{firstName, lastName, email, phone, bannerId, gender, password} = req.body;
    if(!firstName || !lastName || !email || !phone || !bannerId || !gender || !password){
        return next(new ErrorHandler("All fields are required", 400));
    }
    const isRegeistered = await User.findOne({ email });
    if(isRegeistered){
        return next(new ErrorHandler("User already exists", 400));
    }
    const user = await User.create({firstName, lastName, email, phone, bannerId, gender, password, role: "Student"});
    generateToken(user, "User registered successfully", 200, res);
});

export const login= catchAsyncErrors(async (req, res, next) => {
    const{email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please enter all details", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid  password or email", 401));
    }
    if(role !== user.role){
        return next(new ErrorHandler("Invalid Role", 401));
    }
    generateToken(user, "User logged in successfully", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const{firstName, lastName, email, phone, bannerId, gender, password} = req.body;
    if(!firstName || !lastName || !email || !phone || !bannerId || !gender || !password){
        return next(new ErrorHandler("All fields are required", 400));
    }
    const isRegeistered = await User.findOne({email});
    if(isRegeistered){
        return next(new ErrorHandler(`${isRegeistered.role}  with this email already exists`));
    }
    const admin = await User.create({firstName, lastName, email, phone, bannerId, gender, password, role: "Admin"});
    res.status(200).json({
        success: true,
        message: "Admin registered successfully",
        admin,
    })
});

export const getAllProfessors = catchAsyncErrors(async (req, res, next) => {
    const professors = await User.find({role: "Professor"});
    res.status(200).json({
        success: true,
        professors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin= catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "" , {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "Admin logged out successfully",
    });
});

export const logoutStudent= catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("studentToken", "" , {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "Student logged out successfully",
    });
});


export const addNewProfessor = catchAsyncErrors(async (req, res, next) => {
    console.log("Received Files:", req.files);
    console.log("Received Request: ", req.body);
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Professor Avatar required", 400));
    }
     // Check if any file was uploaded
  //   if (!req.files.profAvatar || !req.files.professorAvatar) {
    //    return next(new ErrorHandler("Professor Avatar is missing", 400));
    //}
    const {professorAvatar} = req.files;
   // console.log("Professor Avatar:", professorAvatar); 
    //if (!professorAvatar.mimetype) {
    //    return next(new ErrorHandler("Invalid file format or file missing", 400));
    //}
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(professorAvatar.mimetype)){
        return next(new ErrorHandler("Invalid file format", 400));
    }
    const {firstName, lastName, email, phone, bannerId, gender, password, professorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !bannerId || !gender || !password || !professorDepartment){
        return next(new ErrorHandler("All fields are required", 400));
    }
    const isRegeistered = await User
    .findOne({email});
    if(isRegeistered){
        return next(new ErrorHandler(`${isRegeistered.role} already exists with this email`, 400));
    }
    try {
    const cloudinaryResponse = await cloudinary.uploader.upload(professorAvatar.tempFilePath 
     //   folder: "professors",
       // width: 300,
        //crop: "scale",
);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unkown Cloudinary Error");
        return next(
            new ErrorHandler("Failed To Upload Professor Avatar To Cloudinary", 500)
          );
    }
    const professor = await User.create({
        firstName, lastName, email, phone, bannerId, gender, password, professorDepartment, role: "Professor",
         professorAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Professor registered successfully",
        professor,
    });
} catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
}
});