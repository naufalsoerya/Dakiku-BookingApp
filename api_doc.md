# Individual Project

# Endpoints

_Authentication_

- **POST /login**
- **POST /register**

_Mountain_

- **GET /mountain**
- **GET /mountain/:id**
- **PATCH /mountain/:id**

_Booking_

- **GET /booking**
- **POST /booking/:id**
- **PUT /booking/:id**
- **DELETE /booking/:id**

_Event_

- **GET /event**

---

# POST /login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "login success",
  "token": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
"OR"
{
  "message": "Password is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

---

# POST /register

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response: (201 - Created)

```json
{
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "password": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Username cannot be empty"
}
```

```json
{
  "message": "Email cannot be empty"
}
"OR"
{
  "message": "Must be an email format"
}
"OR"
{
  "message": "Email already registered"
}
```

```json
{
  "message": "Password cannot be empty"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

---

# GET /mountain

_Information_

This endpoint retrieves mountain list

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "page": "number",
  "data": [
    {
      "id": "number",
      "name": "string",
      "mdpl": "number",
      "region": "string",
      "price": "number",
      "imgUrl": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    ...
  ],
  "totalData": "number",
  "totalPage": "number",
  "dataPerPage": "number"
}
```

---

# GET /mountain/:id

_Information_

This endpoint retrieves a specific mountain by ID.

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "id": "number",
  "name": "string",
  "mdpl": "number",
  "region": "string",
  "price": "number",
  "imgUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### PATCH /mountain/:id

_Information:_

- To update image mountain by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`
  - `File`

## Responses

Response: (200 - OK)

```json
{
  "message": "Image success to update"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "File is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Cuisine not found"
}
```

---

# GET /booking

_Information_

This endpoint retrieves all booking

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "date": "string",
  "amount": "number",
  "UserId": "number",
  "MountainId": "number"
}
```

---

# POST /booking/:id

_Information_

This endpoint post booking by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "date": "string",
  "amount": "number",
  "UserId": "number",
  "MountainId": "number"
}
```

---

# PUT /booking/:id

_Information_

This endpoint update booking by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "date": "string",
  "amount": "number",
  "UserId": "number",
  "MountainId": "number"
}
```

---

# POST /booking/:id

_Information_

This endpoint post booking by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "date": "string",
  "amount": "number",
  "UserId": "number",
  "MountainId": "number"
}
```

---

# DELETE /booking/:id

_Information:_

- To delete booking by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Responses

Response: (200 - OK)

```json
{
  "message": "success to delete"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Cuisine not found"
}
```

---

# GET /event

_Information_

This endpoint retrieves all event

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "UserId": "number"
}
```