// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shared imports
import { catchAsync, IResponseUtils, TYPES, ApiResponse } from "@shared/index";

// interfaces imports
import {
  ICommentCRUDService,
  CreateCommentRequestBdy,
  UpdateCommentRequestBdy,
  CommentCRUDRequestParams,
  IComment,
  GetBlogCommentsRequestBody,
} from "../interfaces/index";

/**
 * Controller responsible for handling CRUD operations for comments.
 */
@injectable()
export class CommentsCRUDController {
  /**
   * Creates an instance of CommentsCRUDController.
   *
   * @param {IResponseUtils} responseUtil - Utility to handle API responses.
   * @param {ICommentCRUDService} commentsCRUDService - Service to manage comment operations.
   */
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtil: IResponseUtils,
    @inject(TYPES.CommentCRUDService)
    private readonly commentsCRUDService: ICommentCRUDService
  ) {}

  /**
   * Creates a new comment.
   *
   * @param {Request<{}, {}, CreateCommentRequestBdy>} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  public createComment = catchAsync(
    async (
      req: Request<{}, {}, CreateCommentRequestBdy>,
      res: Response
    ): Promise<void> => {
      await this.commentsCRUDService.createComment(req.body.commentData);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Comment created successfully",
      };

      this.responseUtil.sendResponse(201, res, response);
    }
  );

  /**
   * Retrieves a comment by its ID.
   *
   * @param {Request<CommentCRUDRequestParams>} req - Express request object with comment ID.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  public getComment = catchAsync(
    async (
      req: Request<CommentCRUDRequestParams>,
      res: Response
    ): Promise<void> => {
      const comment: IComment = await this.commentsCRUDService.getComment(
        req.params.commentId
      );

      const response: ApiResponse<IComment> = {
        status: "success",
        message: "Comment retrieved successfully",
        data: {
          comment: comment,
        },
      };

      this.responseUtil.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all comments for a specific blog post.
   *
   * @param {Request<{}, {}, GetBlogCommentsRequestBody>} req - Express request with blogId in body and optional query params.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  public getBlogPostComments = catchAsync(
    async (
      req: Request<{}, {}, GetBlogCommentsRequestBody>,
      res: Response
    ): Promise<void> => {
      const comments: IComment[] =
        await this.commentsCRUDService.getBlogPostComments(
          req.body.blogId,
          req.query
        );

      const response: ApiResponse<IComment[]> = {
        status: "success",
        message: "Comments retrieved successfully",
        results: comments.length,
        data: {
          comments: comments,
        },
      };

      this.responseUtil.sendResponse(200, res, response);
    }
  );

  /**
   * Updates an existing comment.
   *
   * @param {Request<{}, {}, UpdateCommentRequestBdy>} req - Express request with update data and comment info.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  public updateComment = catchAsync(
    async (
      req: Request<{}, {}, UpdateCommentRequestBdy>,
      res: Response
    ): Promise<void> => {
      await this.commentsCRUDService.updateComment(
        req.body.updateCommentData,
        req.body.comment
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Comment updated successfully",
      };

      this.responseUtil.sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a comment by its ID.
   *
   * @param {Request<CommentCRUDRequestParams>} req - Express request with comment ID.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>}
   */
  public deleteComment = catchAsync(
    async (
      req: Request<CommentCRUDRequestParams>,
      res: Response
    ): Promise<void> => {
      await this.commentsCRUDService.deleteComment(
        req.user._id,
        req.params.commentId
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Comment deleted successfully",
      };

      this.responseUtil.sendResponse(204, res, response);
    }
  );
}
