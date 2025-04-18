//packages imports
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  IContentReportingManagementService,
  IContentReportRepository,
} from "../interfaces/index";

@injectable()
export class ContentReportingManagementService
  implements IContentReportingManagementService
{
  // Add your service methods here
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportRepository: IContentReportRepository
  ) {}

  //! in progress
  public processReport = async (): Promise<void> => {
    // Your logic here
  };

  //! in progress
  public updateReportStatus = async (): Promise<void> => {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
  public archiveReport = async (reportId: ObjectId): Promise<void> => {
    try {
      await this.contentReportRepository.archiveReport(reportId);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  public unarchiveReport = async (reportId: ObjectId): Promise<void> => {
    try {
      await this.contentReportRepository.unarchiveReport(reportId);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
}
