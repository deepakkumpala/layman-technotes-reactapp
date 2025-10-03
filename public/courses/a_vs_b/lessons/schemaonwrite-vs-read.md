### Schema on Write
##### *Define first, write later*

 In this approach we decide the **structure of your data first**, and then you can only save data that fits that structure

 It's like packing gift boxes in a factory — every box must have 2 books, 1 pen, 1 pack of sweets. If someone brings pencil or an extra sweet, it won't fit. You reject it.

 - Schema on Write is used in  databases like SQL Server, Oracle, MySQL
 - Schema on Write great when data is clean and predictable.



### Schema on Read
##### *Write first, decide structure later*

You save the data as it comes, and figure out the structure only when you read or use it.

It's like a big buffet. You dump all kinds of food into containers. Later, depending on who is eating, you choose and arrange what's needed on the plate.

- Schema on Read is used in big data tools like MongoDB, Cassandra, Data Lakes, Hadoop
- Best when data is messy, different each time, or fast changing

---

*Learn continuously. Share generously*









