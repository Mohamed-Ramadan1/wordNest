// packages imports
import { Model, ObjectId, Query } from "mongoose";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";

//shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

// interfaces imports
import {
  ScheduledBlogData,
  IBlog,
  IBlogAuthorRepository,
  ScheduleStatus,
  UpdateScheduleBlogBodyRequestBody,
} from "../interfaces/index";

@injectable()
export class BlogAuthorRepository implements IBlogAuthorRepository {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IBlog[], IBlog>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IBlog>
  ) {}

  public async getBlogPostByIdAndAuthor(
    id: ObjectId,
    authorId: ObjectId
  ): Promise<IBlog> {
    try {
      const blogPost: IBlog | null = await this.blogModel.findOne({
        _id: id,
        author: authorId,
      });
      if (!blogPost) {
        throw new Error(
          "Blog post not found with given ID and related to this author."
        );
      }

      return blogPost;
    } catch (err: any) {
      throw new Error(`Failed to get blog by ID and author: ${err.message}`);
    }
  }

  public async getScheduleBlogPostByIdAndAuthor(
    id: ObjectId,
    authorId: ObjectId
  ): Promise<IBlog> {
    try {
      const blogPost: IBlog | null = await this.blogModel.findOne({
        _id: id,
        author: authorId,
        isScheduled: true,
      });
      if (!blogPost) {
        throw new Error(
          "Scheduled blog post not found with given ID and related to this author."
        );
      }
      return blogPost;
    } catch (err: any) {
      throw new Error(
        `Failed to get scheduled blog post by ID and author: ${err.message}`
      );
    }
  }

  public async createScheduleBlogPost(
    blogData: ScheduledBlogData
  ): Promise<void> {
    try {
      const scheduledBlogPost: IBlog = new this.blogModel(blogData);
      scheduledBlogPost.isPublished = false;
      scheduledBlogPost.isScheduled = true;
      scheduledBlogPost.scheduleStatus = ScheduleStatus.PENDING;
      scheduledBlogPost.createBlogSlug();
      scheduledBlogPost.generateSEOMetadata(blogData);
      await scheduledBlogPost.save();
    } catch (err: any) {
      throw new Error(`Failed to schedule blog post: ${err.message}`);
    }
  }

  public async getScheduleBlogPosts(
    authorId: ObjectId,
    query: ParsedQs
  ): Promise<IBlog[]> {
    try {
      const features = this.apiFeatures(
        this.blogModel.find({
          author: authorId,
          isScheduled: true,
        }),
        query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const scheduledBlogPosts: IBlog[] = await features.execute();
      return scheduledBlogPosts;
    } catch (err: any) {
      throw new Error(
        `Failed to get scheduled blog posts for the user: ${err.message}`
      );
    }
  }

  public async getScheduleBlogPost(
    blogId: ObjectId,
    authorId: ObjectId
  ): Promise<IBlog> {
    try {
      const blogPost: IBlog | null = await this.blogModel.findOne({
        _id: blogId,
        author: authorId,
        isScheduled: true,
      });
      if (!blogPost) {
        throw new Error(
          "Scheduled blog post not found with given ID and related to this author."
        );
      }
      return blogPost;
    } catch (err: any) {
      throw new Error(
        `Failed to get scheduled blog post by ID and author: ${err.message}`
      );
    }
  }

  public async updateScheduleBlogPost(
    reqBody: UpdateScheduleBlogBodyRequestBody
  ): Promise<void> {
    try {
      if (reqBody.title) reqBody.blog.title = reqBody.title;
      if (reqBody.content) reqBody.blog.content = reqBody.content;
      if (reqBody.tags) reqBody.blog.tags = reqBody.tags;
      if (reqBody.categories) reqBody.blog.categories = reqBody.categories;
      reqBody.blog.isEdited = true;
      reqBody.blog.editedAt = new Date();
      await reqBody.blog.save();
    } catch (err: any) {
      throw new Error(`Failed to update scheduled blog post: ${err.message}`);
    }
  }

  public async deleteScheduleBlogPost(
    blogId: ObjectId,
    authorId: ObjectId
  ): Promise<void> {
    try {
      const deletedPost: IBlog | null = await this.blogModel.findOneAndDelete({
        _id: blogId,
        author: authorId,
        isScheduled: true,
      });

      if (!deletedPost) {
        throw new Error("Scheduled blog post not found or unauthorized.");
      }
    } catch (err: any) {
      throw new Error(
        `Failed to delete scheduled blog post by ID and author: ${err.message}`
      );
    }
  }

  public async rescheduleBlogPost(
    blog: IBlog,
    rescheduleDate: Date
  ): Promise<void> {
    try {
      blog.scheduledFor = rescheduleDate;
      await blog.save();
    } catch (err: any) {
      throw new Error(`Failed to reschedule blog post: ${err.message}`);
    }
  }

  public async markBlogAsPrivate(blog: IBlog): Promise<void> {
    try {
      blog.isPrivate = true;
      await blog.save();
    } catch (err: any) {
      throw new Error(`Failed to mark blog as private: ${err.message}`);
    }
  }
  public async markBlogAsPublic(blog: IBlog): Promise<void> {
    try {
      blog.isPrivate = false;
      await blog.save();
    } catch (err: any) {
      throw new Error(`Failed to mark blog as public: ${err.message}`);
    }
  }
  public async markBlogAsArchived(blog: IBlog): Promise<void> {
    try {
      blog.isArchived = true;
      await blog.save();
    } catch (err: any) {
      throw new Error(`Failed to mark blog as archived: ${err.message}`);
    }
  }
  public async markBlogAsUnArchived(blog: IBlog): Promise<void> {
    try {
      blog.isArchived = false;
      await blog.save();
    } catch (err: any) {
      throw new Error(`Failed to mark blog as un-archived: ${err.message}`);
    }
  }
}
