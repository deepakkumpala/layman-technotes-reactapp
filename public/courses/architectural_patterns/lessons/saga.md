The Saga Pattern is a design pattern used in distributed systems to manage long-running transactions and ensure data consistency across multiple services. It breaks a large transaction into smaller, independent steps, each of which is a local transaction. If one step fails, compensating actions are triggered to undo the changes made by previous steps.

Key Concepts of the Saga Pattern:
Orchestration: A central coordinator (or orchestrator) manages the sequence of steps in the saga. It decides the order of execution and handles failures by invoking compensating actions.

Imagine an e-commerce order processing system:

A customer places an order.
The system performs the following steps:
Deducts the payment from the customer's account.
Reserves inventory for the order.
Arranges shipping for the order.
If any step fails (e.g., inventory is unavailable), the previous steps must be undone:

Refund the payment.
Cancel any reserved inventory.


Choreography: There is no central coordinator. Instead, each service involved in the saga listens for events and reacts accordingly. This approach is more decentralized and relies on event-driven communication.

In choreography, services communicate through events. For example:

PaymentService emits a PaymentProcessed event.
InventoryService listens for this event and reserves inventory, then emits InventoryReserved.
ShippingService listens for InventoryReserved and arranges shipping.


