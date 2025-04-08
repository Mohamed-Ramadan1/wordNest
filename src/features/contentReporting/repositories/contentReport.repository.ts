//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IContentReportRepository } from "../interfaces/index";

@injectable()
export class ContentReportRepository implements IContentReportRepository {
  constructor() {}
}
