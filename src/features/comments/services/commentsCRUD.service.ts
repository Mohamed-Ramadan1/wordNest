// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  CommentData,
  ICommentCRUDRepository,
  ICommentCRUDService,
} from "../interfaces/index";

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
  public async getComment() {
    try {
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
  public async updateComment() {
    try {
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
  public async deleteComment() {
    try {
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
}
