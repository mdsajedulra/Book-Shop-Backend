"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const shurjopay_1 = __importDefault(require("shurjopay"));
const config_1 = __importDefault(require("../../config"));
const shurjopay = new shurjopay_1.default();
shurjopay.config(config_1.default.sp.sp_endpoint, config_1.default.sp.sp_password, config_1.default.sp.sp_username, config_1.default.sp.sp_prefix, config_1.default.sp.sp_return_url);
console.log(shurjopay);
// const makePayment = async (paymentPayload: any) => {
//   const paymentResult = await shurjopay.makePayment(
//     paymentPayload,
//     (response: any) => console.log('this is shurjo pay repsone', response),
//     (error: any) => console.log('error from shurjo pay', error),
//   );
//   //   console.log(paymentResult);
//   return paymentResult;
// };
// export const orderUtils = {
//   makePayment,
// };
