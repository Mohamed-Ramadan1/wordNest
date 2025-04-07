// Express imports
import { Router } from "express";

// config imports
import { upload } from "@config/multer.config";
// shared imports
import {
  TYPES,
  AccessControlMiddleware,
  IAccessControlMiddleware,
} from "@shared/index";
// config imports
import { container } from "@config/inversify.config";

// middleware imports
import { CommentCRUDMiddleware } from "../middlewares/commentsCRUD.middleware";
import { ICommentCRUDMiddleware } from "../interfaces";

// controller imports
import { CommentsCRUDController } from "../controllers/commentsCRUD.controller";

// get instance from the middleware using the DI Contniainer
const commentCRUDMiddleware: ICommentCRUDMiddleware =
  container.get<CommentCRUDMiddleware>(TYPES.CommentCRUDMiddleware);

const accessControlMiddleware: IAccessControlMiddleware =
  container.get<AccessControlMiddleware>(TYPES.AccessControlMiddleware);

// get instance from the controller using the DI Contniainer
const commentsCRUDController: CommentsCRUDController =
  container.get<CommentsCRUDController>(TYPES.CommentCRUDController);

// create  the express router
const router: Router = Router();

router.use(accessControlMiddleware.protect);

router
  .route("/")
  .get(commentsCRUDController.getBlogPostComments)
  .post(
    upload.single("attachedImage"),
    commentCRUDMiddleware.validateCreateCommentRequest,
    commentsCRUDController.createComment
  );

router
  .route("/:commentId")
  .get(commentsCRUDController.getComment)
  .patch(
    upload.single("attachedImage"),
    commentCRUDMiddleware.validateUpdateCommentRequest,
    commentsCRUDController.updateComment
  )
  .delete(commentsCRUDController.deleteComment);
export default router;
