### Login

Think of a login as the key to enter a building. It allows you to access the SQL Server itself. Without a login, you can't even knock on the door.

A login is a server-level principal in SQL Server. Logins can be based on Windows authentication or SQL Server authentication or Azure Active Directory Authentication

### User
Once you're inside the building (SQL Server), a user determines what rooms (databases) you can enter and what you can do there. For example, you might only be allowed to read books in the library (read-only access) but not take them out (write access).

A user is a database-level principal. It is associated with a login and defines what actions the login can perform within a specific database (authorization).

