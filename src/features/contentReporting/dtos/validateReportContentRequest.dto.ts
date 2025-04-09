import { IsNotEmpty, IsEnum } from "class-validator";
import { ContentReportingType } from "../interfaces/index";

/* 
check the content / type (enum) / details

*/

export class ValidateReportContentRequestDto {
  @IsNotEmpty({ message: "Content id  must not be empty" })
  contentId: string;

  @IsNotEmpty({ message: "Content report type must not be empty" })
  @IsEnum(ContentReportingType, {
    message: `Content report type must be one of the following: ${Object.values(
      ContentReportingType
    ).join(", ")}`,
  })
  contentReportType: ContentReportingType;
  @IsNotEmpty({ message: "Content details must not be empty" })
  details: string;

  constructor(
    contentId: string = "",
    contentReportType: ContentReportingType,
    details: string = ""
  ) {
    this.contentId = contentId;
    this.contentReportType = contentReportType;
    this.details = details;
  }
}
