### RESTful

Imagine you go to a restaurant with a fixed menu. You ask for Meal A and it comes with soup, salad, and dessert — whether you want all of that or not.You get everything that comes with it, even if you just wanted the soup.


Let's say you're building a mobile app and you want to show a user's profile, including:

- Name
- Email
- Phone
- Address
- Orders

You might have to hit 3 different endpoints:

 - /user → Name, Email
 - /user/address → Address
 - /user/orders → Orders

 ### GraphQL

 GraphQL is like a smart waiter at a restaurant who brings you only what you ask for — no more, no less.



 In GraphQL You send 1 request like:

 ```
   {
     user {
            name
            email
     }
   }

 ```
And that’s all you get. Clean and efficient.

---

*Learn continuously. Share generously*


