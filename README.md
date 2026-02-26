## _crud.api_nodejs User CRUD_
This project is a user CRUD from a Back End challenge of Dataside

## Project Setup

- *Requirements:*
    - Node ^22.12.0
    - MongoDB Comunity ^8.0.4
- *Run MongoDB:*
    - Create data directory on local of yout preference
    - run `mongod --dbpath <path to data directory>`
- *Install Dependences:*
    - `npm install`
- *Start Development Serve:*
    - run `npm start`
    - By default server will run on [http://localhost:5000/](http://localhost:5000/)

## Project Structure

**| server.js**   
**| -/config**   
**| -/controllers**  
**| -/db**   
**| -/middleware**      
**| -/routes**           
**| -/models**   

## Routes

 **1.** **Create User:** 
  - Method: `POST`
  - URL: `/api/auth/register`
  - Body: 

```json

{
  "name": "Fulano"
  "email": "fulano@example.com"
  "password": "senha@123"
  "dateOfBirth": "1967-07-01"
}
```


**- Response example:**


```json

{
    "message": "Usuário registrado com sucesso!"
}
```
**2.** **User Login**
  -  Method: `POST`
  -  URL: `/api/auth/login`
  -  Body: 


```json

{
   "email":"fulano@example.com",
    "password": "senha@123"
}

```

**- Response example:**

```json


{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTc2MjE3MmJmODA0ZThiOWM3MjQ4YyIsImlhdCI6MTczMzc4NTEzOCwiZXhwIjoxNzMzODcxNTM4fQ.x7cxlFOsmjuugQjDdneFObwzpXAxe7tGA4Z6YuVUpJY",
    "user": {
        "_id": "675762172bf804e8b9c7248c",
        "name": "fulano",
        "email": "fulano@example.com",
        "dateOfBirth": "1967-07-01",
 }
}
```


  -**NOTES**:  
    -The response includes a *JWT token* for use on protected endpoints.  
	-Use the token in protected requests by passing the header as ``Authorization: <token>.``
 

**3.** **List Users:**
  - Method: `GET`
  - URL: `/api/users/list`
  - Protected: `TRUE`
  - Query Params:
 
 ``` json
  {
    "name": "fulano",
    "email": "fulano@example.com",
    "dateOfBirth": "1967-07-01",
    "sort": ["name", "-dateOfBirth"]
 }
```
  
**- Response example:**
  
```json
[
 {  
     "_id": "675762172bf804e8b9c7248c",
        "name": "fulano",
        "email": "fulano@example.com",
        "dateOfBirth": "1967-07-01",
},
{
      "_id": "675762172df404a8b9c257D",
        "name": "fulano2",
        "email": "fulano2@example.com",
        "dateOfBirth": "1967-07-01",       
}
]
```
	

**4.** **Search user by ID:** 
   - Method: `GET`
   - URL: `/api/users/:ID`
   - Protected: `TRUE`
   - Replace: `:id` by the user ID.
   - Body: 

```json

{ 
    "_id": "675762172bf804e8b9c7248c",
    "name": "fulano",
    "email": "fulano@example.com",
    "dateOfBirth": "1967-07-01",
}
```
**5.** **Partial User Update**
 - Method: `PATCH`
 - URL: `/api/users/:id`
 - Protected: `TRUE`
 - Replace: `:id` by user ID.
 - Body: 

```json

{
  "email": "newemail@example.com"
}
 ```
**- Response example:**

```json

{
"_id": "675762172bf804e8b9c7248c",
    "name": "fulano",
    "email": "newemail@example.com",
    "dateOfBirth": "1967-07-01",
}
```
**6.** **Delete User**
  - Method:`DELETE`
  - URL: `/api/users/:id`
  - Protected: `TRUE`
  - Replace: `:id` by user ID.
 
**- Response example:**
```json

{
"usuário deletado"
}

```


