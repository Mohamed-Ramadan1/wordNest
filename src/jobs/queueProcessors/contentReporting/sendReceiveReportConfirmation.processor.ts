import { sendContentReportAcknowledgment } from "@features/contentReporting/emails/index";
import { IUser } from "@features/users";
import { Job } from "bull";

interface ContentReportJobData {
  reportId: string;
  user: IUser;
}

export class SendReceiveReportConfirmationProcessor {
  constructor() {}
  public async process(job: Job<ContentReportJobData>): Promise<void> {
    const { reportId, user } = job.data;

    try {
      if (!reportId || !user) {
        throw new Error(
          "The report data is not passed correctly. (reportId and user are required)"
        );
      }
      await sendContentReportAcknowledgment(user, reportId);
    } catch (err: any) {
      throw new Error(
        err.message || "Failed to send content report confirmation email."
      );
    }
  }
}
