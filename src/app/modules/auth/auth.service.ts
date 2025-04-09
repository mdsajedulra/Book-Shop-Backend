import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = (payload: IUser) => {
  const result = User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new Error("User Not Found");
  }
  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new Error("User is Blocked");
  }
  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ email: user?.email, role: user?.role }, "secret", {
    expiresIn: "1d",
  });
  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  return { token, verifiedUser };
};

export const authService = {
  register,
  login,
};
