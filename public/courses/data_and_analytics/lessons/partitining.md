### Partitioning

Imagine a  `single` bookshelf where you organize books by genre (horizontal partitioning) or by separating titles and authors into different sections (vertical partitioning).

Partitioning is the process of dividing a single database into smaller, more manageable pieces (partitions). These partitions are typically stored on the same database server.

> Tip: Partitioning is for Vertical scaling. (Same Server)

### How it's different from Sharding?

Sharding is a type of horizontal partitioning, but it goes a step further by distributing the partitions (shards) across multiple database servers.

Imagine multiple bookshelves in different rooms, each holding books for specific genres. You distribute the books across rooms to handle more books as your collection grows.

> Tip: Sharding is for Horizontal scaling. (Multiple Servers)