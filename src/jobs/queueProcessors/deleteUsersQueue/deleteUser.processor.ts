// Bull imports
import { Job } from "bull";

// models imports
import { UserModel } from "@features/users";
import BlogModel from "@features/blogs/models/blog.model";
import CommentModel from "@features/comments/models/comment.model";
import { InteractionModel } from "@features/interactions/models/interactions.model";
import { ReadingListModel } from "@features/readingList/models/readingList.model";
import SupportTicketModel from "@features/supportTickets/models/supportTicket.model";
import { FavoriteModel } from "@features/favorites/models/favorites.model";

// mongoose imports
import { startSession, ClientSession } from "mongoose";

// process the delete user account job.
export const deleteUserAccountProcessor = async (job: Job): Promise<void> => {
  const user = job.data.user;
  if (!user || !user._id) {
    throw new Error("Invalid job payload: user._id is missing");
  }

  const session: ClientSession = await startSession();

  try {
    session.startTransaction();

    await Promise.all([
      UserModel.deleteOne({ _id: user._id }, { session }),
      BlogModel.deleteMany({ author: user._id }, { session }),
      SupportTicketModel.deleteMany({ user: user._id }, { session }),
      ReadingListModel.deleteMany({ user: user._id }, { session }),
      FavoriteModel.deleteMany({ user: user._id }, { session }),
      InteractionModel.deleteMany({ user: user._id }, { session }),
      CommentModel.deleteMany({ comment_author: user._id }, { session }),
    ]);

    await session.commitTransaction();
  } catch (err) {
    console.error("Error deleting user account:", err);
    await session.abortTransaction();
    throw err; // Preserve original error stack
  } finally {
    await session.endSession();
  }
};
