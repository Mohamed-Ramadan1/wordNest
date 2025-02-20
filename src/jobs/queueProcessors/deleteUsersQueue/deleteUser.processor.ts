import { UserModel } from "@features/users";
import BlogModel from "@features/blogs/models/blog.model";
import SupportTicketModel from "@features/supportTickets/models/supportTicket.model";
import { startSession, ClientSession } from "mongoose";
import { Job } from "bull";

export const deleteUserAccountProcessor = async (job: Job): Promise<void> => {
  const user = job.data.user;
  const session: ClientSession = await startSession();

  try {
    session.startTransaction();

    await UserModel.deleteOne({ _id: user._id }, { session });
    await BlogModel.deleteMany({ author: user._id }, { session });
    await SupportTicketModel.deleteMany({ user: user._id }, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err; // Preserve original error stack
  } finally {
    await session.endSession();
  }
};
