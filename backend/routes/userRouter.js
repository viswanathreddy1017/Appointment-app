import express from 'express';
import {addNewAdmin, addNewProfessor, getAllProfessors, getUserDetails, login, logoutAdmin, logoutStudent, studentRegister} from "../controller/userController.js";
import { isAdminAuthenticated, isStudentAuthenticated } from '../middleware/auth.js';


const router = express.Router();
router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/professors",  getAllProfessors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.post("/professor/addnew", isAdminAuthenticated, addNewProfessor);

export default router;
