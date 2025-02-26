import express from 'express';
import {addNewAdmin, addNewProfessor, getAllProfessors, getUserDetails, login, logoutAdmin, logoutStudent, studentRegister} from "../controller/userController.js";
import { isAdminAuthenticated, isStudentAuthenticated } from '../middleware/auth.js';


const router = express.Router();
router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew",  isAdminAuthenticated, addNewAdmin);
router.get("/professors",  getAllProfessors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.post("/professor/addnew", isAdminAuthenticated, addNewProfessor);

export default router;

/*
const express = require('express');
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

router.post('/book', authMiddleware, async (req, res) => {
    const { professor, date, subject, priority } = req.body;

    try {
        const appointment = new Appointment({
            user: req.user.id, // Get user ID from token
            professor,
            date,
            subject,
            priority
        });

        await appointment.save();
        res.status(201).json({ msg: 'Appointment booked successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/appointments', authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id })
            .populate('user')
            .populate('professor');

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;

*/