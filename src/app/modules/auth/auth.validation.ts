import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is Required!!" }).email(),
    password: z.string({ required_error: "Password Required" }),
  }),
});

export const authValidation = {
  loginValidationSchema,
};