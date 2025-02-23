import { IsNotEmpty } from "class-validator";

export class validateAlertTimeFormateDateDto {
  @IsNotEmpty({ message: "alertTime is required" })
  alertTime: Date;

  constructor(alertTime: Date) {
    this.alertTime = alertTime;
  }
}
