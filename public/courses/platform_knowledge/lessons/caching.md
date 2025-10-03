### Caching

 process of storing copies of frequently accessed data in a high-speed storage layer (typically RAM) so that applications can retrieve data faster than querying the main database every time.

 Imagine you are reading a book, and you frequently need to look up a specific page. Instead of flipping through the entire book every time, you place a bookmark on that page. Now, whenever you need it, you can quickly jump to the bookmarked page. This saves you time and effort. Similarly, caching is like bookmarking frequently used data so that it can be accessed quickly without searching for it repeatedly.

 In e-commerce websites like Amazon, caching is used to store product details, user session data, and search results. For instance, When a user searches for "laptops," the results are fetched from the database and stored in a cache.  If another user searches for "laptops" shortly after, the system retrieves the results from the cache instead of querying the database again. This reduces database load, speeds up response times, and improves the user experience.

---


While caching offers great performance benefits, it also comes with its own set of challenges , the biggest being cache invalidation. This means making sure that the data stored in the cache stays fresh and reflects the most current information. If the cache becomes outdated, users might end up seeing old or incorrect data. To prevent this, it’s important to have proper strategies in place for keeping the cache updated, such as:

- Time-based expiration: Automatically refresh the cache at regular intervals (e.g., every 10 minutes).

- Event-driven updates: Refresh the cache immediately when the underlying data changes.

---

### Key Terminologies

Cache Hit:  You order a Margherita pizza, and the app already has it saved in memory because it's a popular choice. Boom , the result shows up instantly.

> Hit = Got it quickly from memory (cache).

- Cache Miss: You order a Goat Cheese & Truffle pizza, super rare. The app has to go to the database to find it because it wasn't cached. That takes longer.

> Miss = Not in memory, had to fetch from slower storage.

- Cache Eviction: The app only keeps the top 5 most-ordered pizzas in its memory. When the memory is full and a new type gets ordered frequently, it evicts (removes) the least popular one to make room.

> Eviction = Throwing out old stuff to make space for new stuff.

### Few Types

- In-memory cache (e.g., Redis, Memcached): Stores key-value pairs in RAM for blazing-fast access.

- Query cache: Saves the result of expensive SQL queries so next time, the same result can be reused.

- Page/Fragment caching: Stores portions of web pages or data retrieved from the DB.
---

*Learn continuously. Share generously*