### Service Discovery

Service discovery is a mechanism used in distributed systems and microservices architectures to enable services to find and communicate with each other dynamically. It eliminates the need for hardcoding service locations (like IP addresses or hostnames) and ensures that services can scale, move, or fail without breaking the system.

Client-Side Service Discovery - The client queries a service registry (a centralized database) to get the location (IP/port) of the service it wants to communicate with. Once the client retrieves the service details, it directly connects to the service instance.

Service Registry: Stores the list of available service instances and their metadata.


Server-Side Service Discovery- The client sends a request to a load balancer or API gateway. The load balancer queries the service registry to find the appropriate service instance and forwards the request.

Usecase, 

Cloud-Native Applications

Services often run on ephemeral infrastructure (e.g., containers) where IPs change frequently. 

Ensures that requests are routed to healthy instances of a service.



