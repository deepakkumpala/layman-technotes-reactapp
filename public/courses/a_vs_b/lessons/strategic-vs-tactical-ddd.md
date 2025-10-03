

### Strategic Patterns

Strategic patterns focus on the **big picture** of the domain and its boundaries. They help in defining how different parts of the system interact and align with business goals.

### Tactical Patterns

Translate the conceptual models to software application and services, example - classes and modules.


In Domain-Driven Design (DDD), **strategic patterns** are key for setting the overall structure and ensuring alignment between different areas of a system. The first of these is the **Bounded Context**, which defines a clear boundary where a specific domain model applies. A **Context Map** is used to visualize the relationships and interactions between different bounded contexts, helping teams understand how different models integrate. The **Ubiquitous Language** ensures that developers and domain experts use the same vocabulary, reducing misunderstandings. Finally, the **Core Domain** highlights the most critical part of the system, where the business’s competitive advantage lies.

On the other hand, **tactical patterns** focus on the implementation details within a bounded context. **Entities** are objects with a unique identity that persist over time, while **Value Objects** are immutable objects representing descriptive elements of the domain. **Aggregates** group related entities, treating them as a single unit. **Repositories** abstract the persistence layer, enabling easy retrieval and storage of aggregates. **Domain Events** capture important events within the domain, and **Factories** handle the creation of complex objects.

The strategic pattern applies across multiple bounded contexts, whereas tactical patterns are applicable only within a bounded context.


In summary, **strategic patterns** focus on high-level design and the interaction between contexts, whereas **tactical patterns** are concerned with implementing and structuring the domain model within a context. Together, these patterns help create robust, maintainable, and scalable systems.



