When we build a data platform or a system that collects data from various sources, processes it, cleanses it, transforms it, and generates insights, we often face the challenge of dealing with large volumes of data. Not all of this data is useful or relevant, so we focus on cleaning, aggregating, and transforming it to derive actionable information and business insights.

Initially, we used data warehouses to store data and generate business insights. These warehouses were based on a schema-on-write approach, meaning data had to fit a predefined structure. As a result, a lot of useful data could be lost because it didn't fit neatly into the schema.

This led to the emergence of data lakes, where there were no such schema constraints. Data lakes follow a schema-on-read model, allowing us to store all types of data in one place, and define the schema when we access the data. This shift moved us from data warehouses to data lakes. However, as data lakes operate on distributed architectures, traditional concepts like primary keys, referential integrity, and ACID properties were not applicable, creating a new set of challenges. As a result, we started to miss the ACID properties and consistency that data warehouses provided, which led to the development of the data lakehouse—combining the best of both worlds, integrating the flexibility of data lakes with the reliability of data warehouses.

As we continue integrating data from multiple sources into a data lake, new data sources often emerge with completely different schemas. This requires us to adjust and incorporate these new sources into the existing structure. Additionally, existing data sources may undergo changes, such as adding new attributes or altering data types, which also need to be accommodated.

Managing these changes becomes difficult in big data environments with vast amounts of data, especially when there are numerous columns and complex ingestion processes. Modifying the code each time there is a change can be time-consuming and complicated, involving testing and deployment cycles. This makes it crucial to find a more configurable solution that minimizes the need for code changes. This is where a metadata-driven architecture comes into play, allowing us to manage changes more efficiently with minimal coding effort.

For any successful Business Intelligence (BI) implementation, the metadata architecture is essential. It serves as the backbone of the system, providing crucial context for the various elements involved. Metadata, essentially, is data about data—it stores detailed information about the data, including its relationships, formats, and context. This allows you to adapt and modify the data as needed.

Metadata also offers broader business insights, such as process details and definitions tied to specific datasets. In short, a metadata-driven architecture enhances the flexibility of the entire ETL process, making it highly configurable. This way, any changes that arise can be seamlessly incorporated into the system.

Let’s explore the different types of metadata typically stored. There are many types, but they can be broadly categorized into three: descriptive, administrative, and structural. 

1. **Descriptive metadata** provides the essential information needed to discover a data resource. It describes everything about the data resource: what the data is, when it was collected, where it came from, and who is responsible for it—essentially, an audit trail. This type of metadata focuses on the content and context of the data.

2. **Administrative metadata** contains details about managing the data resource. It includes information on governance, access control, and security, helping you manage how the data is handled.

3. **Structural metadata** describes how different data elements relate to one another. It helps establish relationships between objects within the system.

By storing these three types of metadata, we can make the ETL process flexible and driven by configuration, allowing for easier adjustments and better scalability.

An important point to note is that metadata-driven architecture aligns with declarative programming, rather than the typical procedural or object-oriented programming. The reason for this is that metadata-based ETL focuses on specifying *what* needs to be done, rather than *how* it should be done. In declarative programming, the distinction is clear: metadata defines the "what"—such as the data model, context, mappings, transformations, and data types—while the "how" is handled by the actual code. Thus, metadata primarily drives the "what" part of the process, making it similar to declarative programming.

