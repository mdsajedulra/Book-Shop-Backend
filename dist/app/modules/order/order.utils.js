"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderUtils = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const shurjopay_1 = __importDefault(require("shurjopay"));
const shurjopay = new shurjopay_1.default();
// shurjopay.config(
//   config.sp.sp_endpoint!,
//   config.sp.sp_password!,
//   config.sp.sp_username!,
//   config.sp.sp_prefix!,
//   config.sp.sp_return_url!,
// );
shurjopay.config('https://sandbox.shurjopayment.com', 'sp_sandbox', 'pyyk97hu&6u6', 'SP', 'http://localhost:5173/thankyou');
// shurjopay.credentials.root_url = config.sp.sp_endpoint!;
// shurjopay.credentials.return_url = config.sp.sp_return_url!;
const makePaymentAsync = (paymentPayload) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        shurjopay.makePayment(paymentPayload, (response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    });
    // const paymentResult = await shurjopay.makePayment(
    //   paymentPayload,
    //   (response: any) => console.log('this is shurjo pay repsone', response),
    //   (error: any) => console.log('error from shurjo pay', error),
    // );
    // // console.log('paymentResult', paymentResult);
    // return paymentResult;
});
const verifyPaymentAsync = (order_id) => {
    return new Promise((resolve, reject) => {
        shurjopay.verifyPayment(order_id, (response) => resolve(response), (error) => reject(error));
    });
};
exports.orderUtils = {
    makePaymentAsync,
    verifyPaymentAsync
};
