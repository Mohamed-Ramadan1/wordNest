import { UserModel } from "@features/users";

import { Job } from "bull";

export const deleteUserAccountProcessor = async (job: Job) => {
  const user = job.data.user;
  try {
    await UserModel.deleteOne({ _id: user._id });
    return "User account deleted successfully";
  } catch (err: any) {
    throw new Error(err.message);
  }
};
