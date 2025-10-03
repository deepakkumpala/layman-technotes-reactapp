# Contract Testing

Before we jump into the technical side of contract testing, let's first zoom out and understand something very human about it.

Every meaningful relationship, whether it's between two people, two businesses, or even two computer systems, is built on agreements.

 - "I will do this if you do that."
- "I will send you a message, and you will understand it in this format."

That's an agreement. That's a contract.

Now, when two software services, let's call them Service A and Service B — need to talk to each other, they don't just start chatting randomly. They agree on how they'll communicate:

- What will the request look like?
- What will the response look like?
- What happens if something goes wrong?

This agreement is called an API contract.

Now here’s the problem, Software changes. Teams evolve. New features are added. Old parts are removed. If Service A changes the way it talks, but Service B is still expecting the old language, suddenly communication breaks. Errors pop up. Systems crash. Customers get frustrated.

And here’s where contract testing becomes our hero.

> Contract testing ensures that the communication between services continues to follow the agreement, the contract - even as the systems evolve.

Contract testing is a type of software testing that ensures that two systems (e.g., a client and a server) can communicate with each other as expected. It verifies that the "contract" (the agreed-upon interaction, such as API requests and responses) between the systems is upheld, without requiring the systems to be fully integrated during testing.

Imagine a food delivery app where the **consumer** is the mobile application used by customers to place orders, and the **provider** is the backend service that processes those orders and provides delivery updates. The interaction between the two is governed by a "contract"—for example, the app might send a POST /order request with details like items and delivery address, and the backend responds with a 200 OK status and an order ID. **Contract testing** ensures that this communication works as expected by verifying that the app sends requests in the correct format and the backend responds appropriately. This is especially important when the app and the backend are developed independently.



