import express from 'express';
import {deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from '../controller/appointmentController.js';
import{isStudentAuthenticated, isAdminAuthenticated} from "../middleware/auth.js"


const router = express.Router();

router.post("/post", isStudentAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);


export default router;
