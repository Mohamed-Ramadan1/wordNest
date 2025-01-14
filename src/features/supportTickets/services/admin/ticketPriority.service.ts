export class TicketPriorityService {
  /**
   * Upgrades the priority of a ticket to a high level.
   * Sends an email notification to the user when the priority is upgraded.
   * Only an admin can perform this operation based on their judgment.
   */
  static upgradePriority() {}

  /**
   * Downgrades the priority of a ticket to a low level.
   * Does not notify the user to avoid frustration.
   * Only an admin can perform this operation based on their judgment.
   */
  static downgradePriority() {}
}
