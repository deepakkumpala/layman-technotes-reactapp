### Indexing in Database


Imagine you're looking for your friend's phone number in a printed telephone directory. You don't flip through every page, you go straight to the letter their last name starts with. That shortcut is exactly what a database index does: it helps you find information quickly without searching through everything.

In the world of online shopping, let's say a customer calls support to check their past orders. If the system has indexed the order ID or customer ID, the customer service rep can pull up that data in seconds—just like jumping to the right page in a phonebook.


The most common kind of index used in databases is called a B-tree index. This type of index keeps information neatly sorted and works well for many types of queries. It makes it fast to add new data, delete old data, or search for specific entries. B-tree indexes are especially good when you're looking for a range of values, like all orders placed between January 1 and January 31, or all customers whose last names start with "S". Without indexes, your database might have to scan every single row to answer even a simple question, which wastes time and slows everything down. ut there's a trade-off, while indexes make reading data faster, they can slightly slow down writing new data because the index needs to stay updated every time something changes.


### Clustered Index

The clustered index is like the main bookshelf in the library, where all the books are arranged alphabetically by title. This is the physical order of the books on the shelf. If you want to find a book by its title, you simply go to the bookshelf, and everything is sorted. Only one clustered index can exist because there’s only one way to physically organize the books on the shelf. When you search for a book by its title, you know exactly where to go because the titles are already sorted in order.


### Non-Clustered Index

The non-clustered index is like a separate index or catalog that helps you find books by their author's name without having to scan all the books on the shelf. Let's say you want to find books by "J.K. Rowling". Instead of looking through every book on the shelf (which is ordered by title), you can go to the author index (non-clustered index) that tells you exactly where all the books by J.K. Rowling are located on the shelf. The non-clustered index does not change the order of the books on the shelf (they are still sorted by title). It simply provides a shortcut to find books based on something else, like the author's name. Multiple non-clustered indexes can exist. You could have one for authors (for searching by author), one for genres (for searching by genre), and another for publishers (for searching by publisher).

---

*Learn continuously. Share generously*



