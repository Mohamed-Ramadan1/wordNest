import { IsNotEmpty, IsEnum } from "class-validator";
import { ContentReportingStatus } from "../interfaces/index";

export class ValidateUpdateReportStatusDto {
  @IsNotEmpty({ message: "Report status must be exits." })
  @IsEnum(ContentReportingStatus, {
    message: `Report status must be one of the following: ${Object.values(
      ContentReportingStatus
    ).join(", ")}`,
  })
  reportStatus: ContentReportingStatus;

  constructor(reportStatus: ContentReportingStatus) {
    this.reportStatus = reportStatus;
  }
}
