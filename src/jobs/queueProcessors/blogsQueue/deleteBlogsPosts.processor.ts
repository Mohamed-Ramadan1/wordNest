import { Job } from "bull";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { BlogModel } from "@features/blogs";
import { AppError } from "@utils/appError";
import { ClientSession, startSession } from "mongoose";
import { blogQueueLogger } from "@logging/index";
// Define the job data structure
export interface DeleteBlogJobData {
  blog: IBlog;
}

export const deleteBlogsPostsProcessor = async (
  job: Job<DeleteBlogJobData>
) => {
  const { blog } = job.data;
  const session: ClientSession = await startSession();
  try {
    session.startTransaction();
    if (!blog) {
      throw new Error(
        "the blog data is not passed correctly please ensure that passing the blog data."
      );
    }
    const deletedBlog = await BlogModel.findByIdAndDelete(blog._id, {
      session,
    });
    // if (!deletedBlog) {
    //   throw new Error(`Failed to delete blog with ID: ${blog._id}`);
    // }

    //! here the logic of deleting the interactions related to this blog (will be added later since its collection not added yet).

    //!here we will add the logic of deleting the comments related to this blog (will be added later since its collection not added yet).

    // Commit the transaction
    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction(); // Rollback if an error occurs
    blogQueueLogger.logFailedBlogDeletion(
      err.message,
      job.attemptsMade,
      blog ? blog._id : undefined
    );
    throw new AppError(err.message, 500);
  } finally {
    await session.endSession(); // Ensure the session is closed
  }
};
