### WebSockets

Before we dive into WebSocket, there's something important we need to understand, Don't just memorize it, connect with what it really means.

The internet, as we know it today, mainly runs on something called HTTP — the HyperText Transfer Protocol. Think of HTTP like this: you, the browser, send a message to a server, asking for something. The server responds, hands over what you asked for... and then closes the door. Every single time you want something new — a new chat message, a new score update, a fresh piece of data — you have to knock on that door again. "Hello? Anything new?" And again. And again.

Now, think about that for a moment. Imagine if you had to call your friend every five seconds just to ask, "Hey, did you text me?" over and over again. Ridiculous, right? But that's exactly how traditional web communication works.

And here's where it becomes a real problem. In today's world, we expect things to happen instantly. We want to see live chat updates, real-time stock prices, online games that respond in milliseconds, and sports scores that pop up the moment they change. If we keep knocking on the server's door every few seconds, it slows everything down. It wastes energy, clogs the network, and, frankly, it frustrates users.

This brings us to a crucial idea: real-time communication.
Real-time means you don't have to ask anymore. Updates just happen. Seamlessly. Instantly. Like when you're texting someone and you suddenly see that beautiful little "typing..." bubble appear — you didn't request it, you didn't refresh anything — it just arrived. Naturally. Effortlessly.

WebSockets provide a persistent, full-duplex communication channel between a client (like a browser) and a server. Unlike HTTP (which is request/response), WebSockets keep the connection open, allowing real-time, two-way communication.

WebSockets are ideal for real-time updates, such as:

- Chat apps
- Online gaming
- Live sports scores
- Stock tickers
- Collaborative apps (like Microsoft or Google Docs)

> Note: Some corporate firewalls and proxies block or throttle WebSocket connections, especially over ws://. Your app might work fine on home Wi-Fi but break inside a bank’s internal network.


The WebSocket handshake enables HTTP to evolve into a persistent, full-duplex communication channel by upgrading the initial HTTP request into a WebSocket connection


 Client Request: A WebSocket-compatible client initially sends a standard HTTP request to the server, presenting an Upgrade header.

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

```

Server Response: Upon receiving the client's request, the server evaluates it for WebSocket compatibility. If valid, the server responds with an HTTP 101 status code and the Upgrade header.

```
 HTTP/1.1 101 Switching Protocols
 Upgrade: websocket
 Connection: Upgrade
 Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=

```
-
--

*Learn continuously. Share generously*

