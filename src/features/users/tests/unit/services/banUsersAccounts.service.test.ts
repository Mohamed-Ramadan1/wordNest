import { BanUserAccountService } from "../../../services/admin/banUsersAccounts.service";


const mockUserManagementRepository = {
  banUser: jest.fn(),
  unBanUser: jest.fn(),
};
const mockEmailQueue = { add: jest.fn() };
const mockBandAccountsQueue = { add: jest.fn() };
const mockBandAccountsLogger = {
  logSuccessBanUserAccount: jest.fn(),
  logFailedBanUserAccount: jest.fn(),
  logSuccessUnbanUserAccount: jest.fn(),
  logFailedUnbanUserAccount: jest.fn(),
};
const mockErrorUtils = { handleServiceError: jest.fn() };

jest.mock("@jobs/index", () => ({
  emailQueue: mockEmailQueue,
  bandAccountsQueue: mockBandAccountsQueue,
  EmailQueueJobs: {
    AccountBanned: "AccountBanned",
    AccountUnbanned: "AccountUnbanned",
  },
  BandAccountQueueJobs: {
    UnBanAccount: "UnBanAccount",
  },
}));

describe("BanUserAccountService", () => {
  let banUserAccountService: BanUserAccountService;

  beforeEach(() => {
    banUserAccountService = new BanUserAccountService(
      mockBandAccountsLogger as any,
      mockUserManagementRepository as any,
      mockErrorUtils as any
    );
    jest.clearAllMocks();
  });

  describe("banUserAccount", () => {
    it("should successfully ban a user", async () => {
      const fakeUser = { _id: "user1", email: "user@example.com" } as any;
      const adminUser = { _id: "admin1", email: "admin@example.com" } as any;

      await banUserAccountService.banUserAccount(
        fakeUser,
        "violation",
        3,
        "127.0.0.1",
        adminUser
      );

      expect(mockUserManagementRepository.banUser).toHaveBeenCalledWith(
        fakeUser,
        adminUser,
        "violation",
        3
      );
      expect(mockEmailQueue.add).toHaveBeenCalledWith("AccountBanned", {
        user: fakeUser,
      });
      expect(mockBandAccountsQueue.add).toHaveBeenCalledWith(
        "UnBanAccount",
        { user: fakeUser },
        { delay: 3 * 24 * 60 * 60 * 1000 }
      );
      expect(
        mockBandAccountsLogger.logSuccessBanUserAccount
      ).toHaveBeenCalled();
    });

    it("should handle error when banning fails", async () => {
      const fakeUser = { _id: "user1", email: "user@example.com" } as any;
      const adminUser = { _id: "admin1", email: "admin@example.com" } as any;
      const error = new Error("Ban failed");

      mockUserManagementRepository.banUser.mockRejectedValueOnce(error);

      await banUserAccountService.banUserAccount(
        fakeUser,
        "violation",
        3,
        "127.0.0.1",
        adminUser
      );

      expect(mockBandAccountsLogger.logFailedBanUserAccount).toHaveBeenCalled();
      expect(mockErrorUtils.handleServiceError).toHaveBeenCalledWith(error);
    });
  });

  describe("unBanUserAccount", () => {
    it("should successfully unban a user", async () => {
      const fakeUser = { _id: "user1", email: "user@example.com" } as any;
      const adminUser = { _id: "admin1", email: "admin@example.com" } as any;

      await banUserAccountService.unBanUserAccount(
        fakeUser,
        "127.0.0.1",
        "unban comment",
        adminUser
      );

      expect(mockUserManagementRepository.unBanUser).toHaveBeenCalledWith(
        fakeUser,
        "unban comment",
        adminUser
      );
      expect(mockEmailQueue.add).toHaveBeenCalledWith("AccountUnbanned", {
        user: fakeUser,
      });
      expect(
        mockBandAccountsLogger.logSuccessUnbanUserAccount
      ).toHaveBeenCalled();
    });

    it("should handle error when unbanning fails", async () => {
      const fakeUser = { _id: "user1", email: "user@example.com" } as any;
      const adminUser = { _id: "admin1", email: "admin@example.com" } as any;
      const error = new Error("Unban failed");

      mockUserManagementRepository.unBanUser.mockRejectedValueOnce(error);

      await banUserAccountService.unBanUserAccount(
        fakeUser,
        "127.0.0.1",
        "unban comment",
        adminUser
      );

      expect(
        mockBandAccountsLogger.logFailedUnbanUserAccount
      ).toHaveBeenCalled();
      expect(mockErrorUtils.handleServiceError).toHaveBeenCalledWith(error);
    });
  });
});
