export const SUPPORT_TICKETS_TYPES = {
  SupportTicketModel: Symbol.for("SupportTicketModel"),
  TicketPriorityController: Symbol.for("TicketPriorityController"),
  TicketPriorityService: Symbol.for("TicketPriorityService"),

  TicketResponseController: Symbol.for("TicketResponseController"),
  TicketResponseService: Symbol.for("TicketResponseService"),

  TicketsCRUDController: Symbol.for("TicketsCRUDController"),
  TicketsCRUDService: Symbol.for("TicketsCRUDService"),

  TicketStatusController: Symbol.for("TicketStatusController"),
  TicketStatusService: Symbol.for("TicketStatusService"),

  SupportTicketController: Symbol.for("SupportTicketController"),
  SupportTicketService: Symbol.for("SupportTicketService"),

  TicketPriorityMiddleware: Symbol.for("TicketPriorityMiddleware"),
  TicketResponseMiddleware: Symbol.for("TicketResponseMiddleware"),
  TicketCRUDMiddleware: Symbol.for("TicketCRUDMiddleware"),
  TicketStatusMiddleware: Symbol.for("TicketStatusMiddleware"),
  SupportTicketsMiddleware: Symbol.for("SupportTicketsMiddleware"),

  SupportTicketRepository: Symbol.for("SupportTicketRepository"),
  SupportTicketManagementRepository: Symbol.for(
    "SupportTicketManagementRepository"
  ),
};
