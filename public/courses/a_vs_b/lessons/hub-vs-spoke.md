### Hub

The central node or core that acts as the main point of communication and control. All communication between spokes must pass through the hub.The hub manages and routes traffic between spokes. Acts as a checkpoint for monitoring and controlling data flow. Ensures all spokes are interconnected via the hub. Allows for easy addition of new spokes without disrupting the network.

If the hub goes down, communication between spokes is disrupted.raffic between spokes must pass through the hub, which can increase latency.The hub can become a bottleneck if not designed to handle high traffic.

### Spokes

Peripheral nodes (e.g., branch offices, regional data centers, or virtual networks) that connect to the hub. Handle local traffic and operations within the spoke. Forward traffic to the hub for inter-spoke communication or external access. 

This design, reduces the need for direct connections between all spokes (which would require a full mesh network).Minimizes infrastructure costs by leveraging the hub as the central point.Centralized security policies can be enforced at the hub,Traffic between spokes is inspected and controlled by the hub.
