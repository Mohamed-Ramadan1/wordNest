// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, IResponseUtils, TYPES, ApiResponse } from "@shared/index";

// interfaces imports
import {
  ICommentCRUDService,
  CreateCommentRequestBdy,
  UpdateCommentRequestBdy,
} from "../interfaces/index";

@injectable()
export class CommentsCRUDController {
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtil: IResponseUtils,
    @inject(TYPES.CommentCRUDService)
    private readonly commentsCRUDService: ICommentCRUDService
  ) {}

  public createComment = catchAsync(
    async (req: Request<{}, {}, CreateCommentRequestBdy>, res: Response) => {
      await this.commentsCRUDService.createComment(req.body.commentData);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Comment created successfully",
      };

      this.responseUtil.sendResponse(201, res, response);
    }
  );

  public getComment = catchAsync(async (req: Request, res: Response) => {});
  public getBlogPostComments = catchAsync(
    async (req: Request, res: Response) => {}
  );
  public updateComment = catchAsync(
    async (req: Request<{}, {}, UpdateCommentRequestBdy>, res: Response) => {
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
  public deleteComment = catchAsync(async (req: Request, res: Response) => {});
}
