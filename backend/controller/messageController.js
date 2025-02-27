import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import {Message} from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res,next) => {
    const {firstName, lastName, email,phone, message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler( "All fields are required"));
    }
        await Message.create ({firstName, lastName, email, phone, message});
        res.status(200).json({success: true, msg: "Message sent successfully"});

    })
    export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
        const messages = await Message.find();
        res.status(200).json({
          success: true,
          messages,
        });
      });