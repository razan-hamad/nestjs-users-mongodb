# NestJS Users API

A simple REST API built with NestJS and MongoDB.

## Features

* Create User
* Get All Users
* Get User By ID
* Update User
* Delete User
* Search Users
* MongoDB Integration
* Mongoose ODM
* DTO Validation
* Error Handling

## Technologies Used

* NestJS
* TypeScript
* MongoDB
* Mongoose

## API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /users                | Create a new user |
| GET    | /users                | Get all users     |
| GET    | /users/:id            | Get a user by ID  |
| PATCH  | /users/:id            | Update a user     |
| DELETE | /users/:id            | Delete a user     |
| GET    | /users/search?q=value | Search users      |

## Installation

```bash
npm install
```

## Run the Project

```bash
npm run start:dev
```

The server runs on:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
```
