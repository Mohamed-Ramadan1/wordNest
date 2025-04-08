//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IContentReportingCRUDMiddleware } from "../interfaces/index";

@injectable()
export class ContentReportingCRUDMiddleware
  implements IContentReportingCRUDMiddleware
{
  constructor() {}
}
