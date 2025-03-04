import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";  
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true,  minLength: [3, "First Name must contain atleast 3 Characters" ] },
  lastName: { type: String, required: true,  minLength: [3, "First Name must contain atleast 3 Characters" ] },
  email: { type: String, required: true, validate: [validator.isEmail, "Please enter a valid email"] },
  phone:{ type: String, required: true, minLength: [10, "Phone number must contain atleast 10 digits"] , maxlength: [10, "Phone number must contain atmost 10 digits"]},
  bannerId: { type: String, required: true, minLength: [6, "Banner Id must contain atleast 06 Digits"] },
  gender: { type: String, required: true, enum: ["Male", "Female" ]},
  password: { type: String, required: true, minLength: [8, "Password must contain atleast 8 characters characters"], select: false },
  role: { type: String, required: true, enum: ["Student", "Admin", "Professor"] }, 
  professorDepartment: {type: String},
  professorAvatar: {public_id:String, url: String},
});

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.genearteJsonWebToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES});
};


export const User = mongoose.model("User", userSchema);