### Load Balancer

A load balancer distributes incoming network or application traffic across multiple servers to improve performance, reliability, and scalability. It ensures high availability by redirecting traffic if a server fails.

Round Robin is a load balancing algorithm that distributes requests sequentially across servers in a cyclic order. It doesn’t consider server load or capacity.

 Weighted Round Robin assigns a weight to each server based on its capacity. Servers with higher weights handle more requests.

Least Connections,  This algorithm directs traffic to the server with the least number of active connections, ensuring no server is overloaded.

Least Response Time, This algorithm routes traffic to the server with the lowest response time, considering both server load and network latency.

URL Hash,  hashing algorithm generates a hash value based on the URL. This value determines which server will process the request, ensuring consistent routing for the same URL.

IP Hash, A hashing algorithm generates a hash value based on the client’s IP address. This ensures that requests from the same IP are routed to the same server, useful for session persistence.


 Stateful load balancers maintain session persistence, ensuring that a user’s requests are routed to the same server during a session.

 Layer 4 load balancers operate at the transport layer of the OSI model, using protocols like TCP/UDP to distribute traffic. They don’t inspect the content of the requests.

 Layer 7 load balancers operate at the application layer of the OSI model. They can make routing decisions based on HTTP headers, cookies, or request content.

 ---

 Algorithms can be classified as static or dynamic based on the state of the machine. Let's break down each category:

Static algorithms do not account for the changing state of the servers. Instead, they assign tasks based on predefined knowledge of the server's configuration. As a result, these algorithms are relatively simple and are typically implemented on a single router or basic machine that handles all incoming requests.

On the other hand, dynamic algorithms take into account the current or recent state of the servers. These algorithms maintain state information by continuously communicating with the servers, which introduces additional communication overhead. The need for state maintenance makes dynamic algorithms more complex to design.

----

Stateful load balancing involves keeping track of the session states established between clients and the hosting servers. The stateful load balancer (LB) uses this session information in its algorithm to perform load balancing.

In practice, stateful LBs maintain a data structure that maps incoming clients to specific hosting servers. While this approach ensures session persistence, it introduces greater complexity and can limit scalability, as session information is stored and shared across all load balancers. This means that load balancers rely on shared state information to make forwarding decisions.

On the other hand, stateless load balancing does not maintain any session state, making it faster and more lightweight. Stateless LBs use consistent hashing to decide how to forward requests. However, in the event of infrastructure changes (such as the addition of a new application server), stateless LBs may not be as resilient as stateful LBs. This is because consistent hashing alone may not be sufficient to ensure that requests are routed to the correct server, meaning that a local state might still be necessary alongside consistent hashing.

---

