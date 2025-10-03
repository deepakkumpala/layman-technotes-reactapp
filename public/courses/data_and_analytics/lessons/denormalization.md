### Denormalization

Imagine you have a library where every book is stored in a separate room based on its genre, author, and year of publication. If you want to find a specific book, you might have to visit multiple rooms to gather all the details about it. This is like a "normalized" database—everything is neatly organized but spread out.

Now, if you decide to keep a copy of the most popular books in a single room, you can find them faster without running around. This is "denormalization"—you sacrifice some neatness (by duplicating data) to make things quicker and easier to access.

---

You have one table for customers. Another for products. And another for orders. Now, every time someone places an order, your system has to join all these tables together to figure out,  Who placed the order, What products they bought, Product prices, names, etc.  These joins take time, especially when there are millions of records.

To speed things up, you create an Orders Summary Table that includes, Customer name, Product name, Product price, Quantity, Order date . Now, when you want to quickly show recent orders on the dashboard, you just look at this single table , no joining needed.


We use Denormalization, when read performance is critical (e.g., analytics dashboards, reporting systems) or When the database is read-heavy and write operations are less frequent or In distributed systems where joins across tables are expensive.

---

*Learn continuously. Share generously*

