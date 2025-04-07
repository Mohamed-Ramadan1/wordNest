// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  CommentData,
  IComment,
  ICommentCRUDRepository,
  ICommentCRUDService,
  UpdateCommentData,
} from "../interfaces/index";
import { ObjectId } from "mongoose";

@injectable()
export class CommentsCRUDService implements ICommentCRUDService {
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtile: IErrorUtils,
    @inject(TYPES.CommentCRUDRepository)
    private readonly commentsCRUDRepository: ICommentCRUDRepository
  ) {}

  public async createComment(commentData: CommentData): Promise<void> {
    try {
      await this.commentsCRUDRepository.createNewComment(commentData);
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  public async getComment(commentId: ObjectId): Promise<IComment> {
    try {
      const comment: IComment =
        await this.commentsCRUDRepository.getCommentById(commentId);
      return comment;
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
  public async getBlogPostComments() {
    try {
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
  public async updateComment(
    updateCommentData: UpdateCommentData,
    comment: IComment
  ) {
    try {
      await this.commentsCRUDRepository.updateComment(
        comment,
        updateCommentData
      );
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  public async deleteComment(userId: ObjectId, commentId: ObjectId) {
    try {
      await this.commentsCRUDRepository.deleteComment(commentId, userId);
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
}
