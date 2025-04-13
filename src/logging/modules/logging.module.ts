import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";

// interfaces imports
import {
  IAccountDeletionLogger,
  IAccountStatusLogger,
  IAuthLogger,
  IBandAccountsLogger,
  IBlogsLogger,
  IBlogsQueueLogger,
  IChangeAccountEmailLogger,
  ICloudinaryLogger,
  IEmailLogger,
  IEmailsVerificationsLogger,
  ILockAccountsLogger,
  IReadingListLogger,
  ISupportTicketsLogger,
  IReportContentLogger,
} from "@logging/interfaces";

// loggers imports
import {
  AuthLogger,
  EmailVerificationLogger,
  EmailLogger,
  CloudinaryLogger,
  AccountStatusLogger,
  AccountDeletionLogger,
  ChangeAccountEmailLogger,
  LockAccountsLogger,
  BandedAccountsLogger,
  BlogsLogger,
  BlogsQueueLogger,
  SupportTicketsLogger,
  ReadingListLogger,
  ReportContentLogger,
} from "@logging/index";
/**
 * This module encapsulates the bindings for the logging system(winston logger) .
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Loggers bindings
  bind<IAuthLogger>(TYPES.AuthLogger).to(AuthLogger);
  bind<IEmailLogger>(TYPES.EmailLogger).to(EmailLogger);
  bind<IEmailsVerificationsLogger>(TYPES.EmailVerificationLogger).to(
    EmailVerificationLogger
  );
  bind<ICloudinaryLogger>(TYPES.CloudinaryLogger).to(CloudinaryLogger);
  bind<IAccountStatusLogger>(TYPES.AccountStatusLogger).to(AccountStatusLogger);
  bind<IAccountDeletionLogger>(TYPES.AccountDeletionLogger).to(
    AccountDeletionLogger
  );
  bind<IChangeAccountEmailLogger>(TYPES.ChangeAccountEmailLogger).to(
    ChangeAccountEmailLogger
  );
  bind<ILockAccountsLogger>(TYPES.LockAccountsLogger).to(LockAccountsLogger);
  bind<IBandAccountsLogger>(TYPES.BandedAccountsLogger).to(
    BandedAccountsLogger
  );
  bind<IBlogsLogger>(TYPES.BlogsLogger).to(BlogsLogger);
  bind<IBlogsQueueLogger>(TYPES.BlogsQueueLogger).to(BlogsQueueLogger);
  bind<ISupportTicketsLogger>(TYPES.SupportTicketsLogger).to(
    SupportTicketsLogger
  );
  bind<IReadingListLogger>(TYPES.ReadingListLogger).to(ReadingListLogger);
  bind<IReportContentLogger>(TYPES.ReportContentLogger).to(ReportContentLogger);
});
