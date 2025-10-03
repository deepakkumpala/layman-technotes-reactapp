### Reverse Proxy

A reverse proxy is like a receptionist at a large office building — you go to the front desk, and they direct you to the right department, without ever letting you into the building directly. Imagine, You walk into a huge company and ask for someone. The receptionist doesn't tell you where they are. Instead, they take your request, talk to the person inside, and then bring you the response. You never directly interact with the employees — only through the receptionist. That's exactly what a reverse proxy does for web servers.

---

A reverse proxy is a server that sits in front of one or more backend servers, handling incoming client requests. This will Accepts requests from clients (e.g., browsers or mobile apps).  Forwards them to the appropriate backend server. Collects the response and sends it back to the client. Clients don't even know how many or which servers are behind the proxy.

Key Features of reverse proxy are, Load Balancing, Security, SSL Termination, Caching, Compression/Optimization etc

---

**Example**

Your mobile app sends a request to `https://api.laymannotes.com`, That request hits the reverse proxy (API Gateway), that routes the request to the correct microservice:

```
   /notes            goes to the note service
   /categories       goes to the category service
```


The gateway applies rate-limiting, authentication, and forwards the response back to your app

---

*Learn continuously. Share generously*






