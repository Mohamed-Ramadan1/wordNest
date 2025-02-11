export enum BlogsQueueJobs {
  DeleteBlog = "deleteBlog",
  // search and add marked blogs to be retried for deletion
  CollectFailedDeletionBlogs = "collectFailedDeletionBlogs",
}
