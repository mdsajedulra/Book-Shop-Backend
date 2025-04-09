import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async(req,res,_next)=>{
    const payload = req.body;
    const result = await userService.createUser(payload);

    sendResponse(res, {
        message: "user create Seccussfully",
        statudeCode: StatusCodes.CREATED,
        success: true,
        data: result,
    })
})



export const userController = {
    createUser,
}