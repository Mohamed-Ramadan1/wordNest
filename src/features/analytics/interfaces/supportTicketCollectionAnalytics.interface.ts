import {
  SupportTicketStatus,
  SupportTicketPriority,
  SupportTicketCategory,
} from "@features/supportTickets/interfaces";

export interface ISupportTicketsCollectionAnalytics {
  // Total Metrics
  totalTickets: number;
  totalUserResponses: number; // Total user responses across all tickets
  totalAdminResponses: number; // Total admin responses across all tickets
  totalAttachments: number; // Total attachments (ticket + user + admin responses)

  // Status-Based Metrics
  ticketsByStatus: { [key in SupportTicketStatus]: number }; // e.g., { OPEN: 50, RESOLVED: 20 }
  ticketsByPriority: { [key in SupportTicketPriority]: number }; // e.g., { LOW: 60, HIGH: 10 }
  ticketsByCategory: { [key in SupportTicketCategory]: number }; // e.g., { TECHNICAL: 30, BILLING: 15 }

  // Temporal Metrics
  ticketsCreatedToday?: number; // Tickets created today (based on createdAt)
  ticketsCreatedThisMonth?: number; // Tickets created this month
  ticketsResolvedToday?: number; // Tickets resolved today (based on resolvedAt)
  ticketsResolvedThisMonth?: number; // Tickets resolved this month
  ticketsReopenedToday?: number; // Tickets reopened today (based on reopenedAt)
  ticketsReopenedThisMonth?: number; // Tickets reopened this month

  // Performance Metrics
  averageResolutionTimeHours?: number; // Average time to resolve (createdAt to resolvedAt)
  averageFirstResponseTimeHours?: number; // Average time to first admin response
  averageUserResponsesPerTicket?: number; // Average user responses per ticket
  averageAdminResponsesPerTicket?: number; // Average admin responses per ticket

  // Engagement Metrics
  mostActiveUsers?: string[]; // Top user IDs or emails by ticket creation (e.g., top 5)
  mostActiveAdmins?: string[]; // Top admin IDs or emails by response count (e.g., top 5)
  ticketsWithFollowUps?: number; // Tickets with userResponses.isFollowUp: true

  // Administrative Metrics
  escalatedTickets?: number; // Tickets with adminResponses.escalationLevel > 1
  ticketsWithInternalNotes?: number; // Tickets with adminResponses.internalNotes

  // Other Insights
  mostCommonCategories?: string[]; // Top ticket categories (e.g., top 5)
  mostCommonPriorities?: string[]; // Top ticket priorities (e.g., top 5)

  // Temporal Fields
  lastCalculatedAt?: Date; // When analytics were last updated
  createdAt?: Date; // When analytics record was created
  updatedAt?: Date; // When analytics record was last updated
}
