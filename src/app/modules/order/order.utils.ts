/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

// shurjopay.config(

//   config.sp.sp_endpoint!,
//   config.sp.sp_password!,
//   config.sp.sp_username!,
//   config.sp.sp_prefix!,
//   config.sp.sp_return_url!,
// );

shurjopay.config(
  'https://sandbox.shurjopayment.com',
  'sp_sandbox',
  'pyyk97hu&6u6',
  'SP',
  'https://21.academy/',
);

// shurjopay.credentials.root_url = config.sp.sp_endpoint!;
// shurjopay.credentials.return_url = config.sp.sp_return_url!;

const makePaymentAsync = async (paymentPayload: any):Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      },
    );
  });

  // const paymentResult = await shurjopay.makePayment(
  //   paymentPayload,
  //   (response: any) => console.log('this is shurjo pay repsone', response),
  //   (error: any) => console.log('error from shurjo pay', error),
  // );
  // // console.log('paymentResult', paymentResult);
  // return paymentResult;
};
const verifyPaymentAsync = (order_id: string) :Promise<VerificationResponse[]>=> {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};
export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync
};
