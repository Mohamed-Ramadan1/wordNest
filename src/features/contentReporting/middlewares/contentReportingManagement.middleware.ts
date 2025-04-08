//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IContentReportingManagementMiddleware } from "../interfaces/index";

@injectable()
export class ContentReportingManagementMiddleware
  implements IContentReportingManagementMiddleware
{
  constructor() {}
}
