export class BlogCRUDController {
  /**
   * Deletes a blog post.
   * Handles the request to remove a specified blog post permanently from the system.
   */
  public deleteBlogPost() {}

  /**
   * Retrieves a single blog post.
   * Fetches a specific blog post by its ID for viewing or editing.
   */
  public getBlogPost() {}

  /**
   * Retrieves all blog posts.
   * Fetches a list of all blog posts available in the system.
   */
  public getAllBlogPosts() {}

  /**
   * un publish a blog post.
   * Handles the request to un publish a specified blog post
   * no longer appear to users  until been reviewed and deleted or republished again .
   */
  public unPublishBlogPost() {}

  /**
   * republish a blog post.
   * Handles the request to republish a specified blog post
   * that has been previously unpublished and now is available to users to see and interact.
   *
   */
  public rePublishBlogPost() {}
}
