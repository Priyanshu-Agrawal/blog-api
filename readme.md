# Blog-api

This is a project that implements a blogging platform's API using Node.js, Express, and MongoDB.

## Installation

1. Clone the repository:
    ```bash 
    git clone https://github.com/Priyanshu-Agrawal/blog-api 
   ```
2. Navigate to the project directory:
    ```bash
    cd blog-api
    ```
3. Install the required packages:
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm start
    ```
5. The server will start at `http://localhost:5000`

## Usage

- Create a new user by making a `POST` request to `/users` with the following JSON payload:
    ```json
    { "name": "John Doe", "email": "john@example.com", "password": "password" }
    ```
-

- Create a new blog by making a `POST` request to `/blogs` with the following JSON payload:

    ```json
    { "userId": "user-id", "title": "My First Blog", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."} 
    ``` 
  
- Add a comment to a blog by making a `POST` request to `/comments` with the following JSON payload:
    ```json
    { "viewer": { "name": "Jane Smith", "id": "user-id" }, "blogId": "blog-id", "comment": "Great blog!" }
    ```


Replace `user-id` with the ID of the user who is making the comment, and `blog-id` with the ID of the blog.

- Get all blogs by making a `GET` request to `/blogs`.

- Get a specific blog by making a `GET` request to `/blogs/:id`, where `:id` is the ID of the blog.

- Update a blog by making a `PUT` request to `/blogs/:id`, where `:id` is the ID of the blog, with the following JSON payload:

    ```json
    { "title": "My Updated Blog", "content": "Updated content." }
    ```


- Delete a blog by making a `DELETE` request to `/blogs/:id`, where `:id` is the ID of the blog.

   