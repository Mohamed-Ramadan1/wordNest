//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IContentReportingCRUDService } from "../interfaces/index";

@injectable()
export class ContentReportingCRUDService
  implements IContentReportingCRUDService
{
  constructor() {}
}
