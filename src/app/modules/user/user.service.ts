import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};
// block user

const blockUser = async (userId: string) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
  );
};

export const userService = {
  createUser,
  getAllUser,
  blockUser,
};
