// Bull imports
import { Job } from "bull";

// models imports
import { UserModel } from "@features/users_feature";
import BlogModel from "@features/blogs/models/blog.model";
import { ReadingListModel } from "@features/readingList/models/readingList.model";
import SupportTicketModel from "@features/supportTickets/models/supportTicket.model";
import { FavoriteModel } from "@features/favorites/models/favorites.model";

// mongoose imports
import { startSession, ClientSession } from "mongoose";

// process the delete user account job.
export const deleteUserAccountProcessor = async (job: Job): Promise<void> => {
  const user = job.data.user;
  const session: ClientSession = await startSession();

  try {
    session.startTransaction();

    await UserModel.deleteOne({ _id: user._id }, { session });
    await BlogModel.deleteMany({ author: user._id }, { session });
    await SupportTicketModel.deleteMany({ user: user._id }, { session });
    await ReadingListModel.deleteMany({ user: user._id }, { session });
    await FavoriteModel.deleteMany({ user: user._id }, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err; // Preserve original error stack
  } finally {
    await session.endSession();
  }
};
