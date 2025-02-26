import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/Appointment.js";
import { User } from "../models/User.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, bannerId, gender, appointment_date, department, professor_firstName, professor_lastName, hasVisited, reason,}
  = req.body;
  if ( !firstName || !lastName || !email || !phone || !bannerId || !gender || !appointment_date || !department || !professor_firstName || !professor_lastName || !reason) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: professor_firstName,
    lastName: professor_lastName,
    role: "Professor",
    professorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Professor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Professor Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const professorId = isConflict[0]._id;
  const studentId = req.user._id;
  const appointment = await Appointment.create({ 
    firstName, lastName, email, phone, bannerId, gender, appointment_date, department, professor: {
      firstName: professor_firstName,
      lastName: professor_lastName,
    },
    hasVisited,
    reason,
    professorId,
    studentId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
      appointment
    });
  }
);
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});