// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IAnalyticsRepository } from "../interfaces";

// other features imports
import { IUser } from "@features/users";
import { ISupportTicket } from "@features/supportTickets/interfaces";
import { IBlog } from "@features/blogs/interfaces";

@injectable()
export class AnalyticsRepository implements IAnalyticsRepository {
  constructor(
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>,
    @inject(TYPES.SupportTicketModel)
    private readonly supportTicketModel: Model<ISupportTicket>,
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>
  ) {}
  public async getBlogsAnalytics(): Promise<void> {
    try {
    } catch (err: any) {}
  }

  public async getUsersAnalytics(): Promise<void> {
    try {
    } catch (err: any) {}
  }

  public async getSupportTicketsAnalytics(): Promise<void> {
    try {
    } catch (err: any) {}
  }
}
