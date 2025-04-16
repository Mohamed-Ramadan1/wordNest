//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import { IContentReportingManagementService } from "../interfaces/index";

@injectable()
export class ContentReportingManagementService
  implements IContentReportingManagementService
{
  // Add your service methods here
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  public processReport = async (reportId: string): Promise<void> => {
    // Your logic here
  };
  public updateReportStatus = async (
    reportId: string,
    status: string,
    resolutionType?: string
  ): Promise<void> => {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
  public archiveReport = async (reportId: string): Promise<void> => {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  public unarchiveReport = async (reportId: string): Promise<void> => {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
}
