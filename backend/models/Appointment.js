import mongoose from "mongoose";
import validator from "validator";
import {Mongoose} from "mongoose";



const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true,  minLength: [3, "First Name must contain atleast 3 Characters" ] },
  lastName: { type: String, required: true,  minLength: [3, "First Name must contain atleast 3 Characters" ] },
  email: { type: String, required: true, validate: [validator.isEmail, "Please enter a valid email"] },
  phone:{ type: String, required: true, minLength: [10, "Phone number must contain atleast 10 digits"] , maxlength: [10, "Phone number must contain atmost 10 digits"]},
  bannerId: { type: String, required: true, minLength: [6, "Banner Id must contain atleast 06 Digits"] },
  gender: { type: String, required: true, enum: ["Male", "Female" ]},
    appointment_date: { type: Date, required: true },
    department: { type: String, required: true },
    professor: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    hasVisited: { type: Boolean, default: false },
    professorId: { type: mongoose.Schema.ObjectId, required: true },
    studentId: { type: mongoose.Schema.ObjectId, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    });
export const Appointment = mongoose.model('Appointment', appointmentSchema);