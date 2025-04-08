//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IContentReportingManagementService } from "../interfaces/index";

@injectable()
export class ContentReportingManagementService
  implements IContentReportingManagementService
{
  // Add your service methods here
  constructor() {
    // Initialize any dependencies or services here
  }
}
