export enum BlogsQueueJobs {
  DeleteBlog = "deleteBlog",
  // search and add marked blogs to be retried for deletion
  CollectFailedDeletionBlogs = "collectFailedDeletionBlogs",
  // publish scheduled blog post
  PublishScheduledBlog = "publishScheduledBlog",

  // send delete blog email
  SendDeleteBlogEmail = "sendDeleteBlogEmail",
  // send blog un published post email
  SendUnPublishedBlogEmail = "sendUnPublishedBlogEmail",
  // send blog republished post email
  SendRepublishedBlogEmail = "sendRepublishedBlogEmail",
}
