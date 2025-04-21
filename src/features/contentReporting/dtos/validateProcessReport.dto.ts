import { IsNotEmpty, IsEnum, MinLength } from "class-validator";
import { ResolutionType } from "../interfaces/index";
export class ValidateProcessReportDto {
  @IsNotEmpty({ message: "processedNotes is required" })
  @MinLength(10, {
    message: "processedNotes must be at least 10 characters long",
  })
  processedNotes: string;

  @IsNotEmpty({ message: "resolutionType is required" })
  @IsEnum(ResolutionType, {
    message: `resolutionType must be one of the following values: ${Object.values(
      ResolutionType
    ).join(", ")}`,
  })
  resolutionType: ResolutionType;

  constructor(processedNotes: string, resolutionType: ResolutionType) {
    this.processedNotes = processedNotes;
    this.resolutionType = resolutionType;
  }
}
