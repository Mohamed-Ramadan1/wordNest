// packages imports
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import {
  IComment,
  ICommentCRUDMiddleware,
  ICommentCRUDService,
  ICommentCRUDRepository,
} from "../interfaces/index";

// middlewares imports
import { CommentCRUDMiddleware } from "../middlewares/commentsCRUD.middleware";

// services imports
import { CommentsCRUDService } from "../services/commentsCRUD.service";

// controllers imports
import { CommentsCRUDController } from "../controllers/commentsCRUD.controller";

// repositories imports
import { CommentCRUDRepository } from "../repositories/commentsCRUD.repository";

// models imports
import CommentModel from "../models/comment.model";
/**
 * This module encapsulates the bindings for the Interactions feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // bind the Comment model to the container
  bind<Model<IComment>>(TYPES.CommentModel).toConstantValue(CommentModel);
  // bind the CommentCRUDMiddleware to the container
  bind<ICommentCRUDMiddleware>(TYPES.CommentCRUDMiddleware)
    .to(CommentCRUDMiddleware)
    .inSingletonScope();

  // bind the CommentsCRUDController to the container
  bind<CommentsCRUDController>(TYPES.CommentCRUDController)
    .to(CommentsCRUDController)
    .inSingletonScope();

  // bind the CommentsCRUDService to the container
  bind<ICommentCRUDService>(TYPES.CommentCRUDService)
    .to(CommentsCRUDService)
    .inSingletonScope();

  // bind the CommentsCRUDRepository to the container
  bind<ICommentCRUDRepository>(TYPES.CommentCRUDRepository)
    .to(CommentCRUDRepository)
    .inSingletonScope();
});
