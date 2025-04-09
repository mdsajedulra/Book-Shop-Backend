import { StatusCodes } from "http-status-codes";
import auth from "../../middlewares/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const register = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await authService.register(payload);
    sendResponse(res, {
        data: result,
        message: "User Registered Successfully",
        statudeCode: StatusCodes.CREATED,
        success: true,
    })
});


const login = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await authService.login(payload);
    sendResponse(res, {
        data: result,
        message: "User Logged in Successfully",
        statudeCode: StatusCodes.OK,
        success: true,
    })
});

export const authController = {
    register,
    login
}