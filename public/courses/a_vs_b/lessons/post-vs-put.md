### POST


POST is used to create a new resource on the server when the client does not know the resource's URI in advance. It often triggers server-side logic like generating an ID, sending confirmation emails, or logging actions. For example, in a hospital management system, when a new patient signs up through a registration form, the client sends a POST /patients request. The server processes the data, assigns a patient ID (e.g., 4567), and stores it in the database. This is useful when creating appointments, user accounts, or support tickets.


#### POST Example (Create a New Resource)
```http
POST /users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```
**Response:**
```http
201 Created
Location: /users/123
```

### PUT

PUT is used when you want to create or completely replace a resource at a known URI. It is idempotent, meaning repeated calls with the same data won’t change the result. For instance, if a doctor updates their full profile in the system (say, /doctors/789), the client sends a complete representation of the resource using PUT. Even if no data changes, calling PUT again does the same thing. It’s often used in admin dashboards to update entire records—like replacing an entire user profile or device configuration.


#### PUT Example (Update an Existing Resource)
```http
PUT /users/123
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```
**Response:**
```http
200 OK
```

### PATCH – Partial Update

PATCH is used to partially update a resource. Unlike PUT, which replaces the entire object, PATCH sends only the fields that need to change. For example, if a patient wants to update just their phone number in the medical records (/patients/4567), the frontend can send a small PATCH request like { "phone": "+91-9876543210" }. This minimizes bandwidth and avoids the risk of overwriting unmodified fields. It's ideal for user settings, profile tweaks, or status updates (e.g., marking an appointment as “completed”).

