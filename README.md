
# GraphQL Example with Node.js and Apollo Server

This is a simple example of implementing a GraphQL API using **Node.js** with **Apollo Server** and **Express**. It allows querying and adding books to a list.

## Requirements

Before starting, make sure you have **Node.js** and **npm** installed.

## Installation

1. Clone the repository or create a new directory for your project.

2. Initialize the project and install dependencies:

   ```bash
   npm init -y
   npm install express apollo-server-express graphql
   ```

3. Create the following project structure:

   ```
   graphql-example/
   ├── package.json
   ├── index.js
   └── data.js
   ```

## Files Explanation

### `data.js`
Defines the initial data for books.

```javascript
// data.js
const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

module.exports = { books };
```

### `index.js`
This file contains the setup for the GraphQL API with Express and Apollo Server.

```javascript
// index.js
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { books } = require("./data");

// Define the GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

// Define resolvers for Query and Mutation
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { id: books.length + 1, title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

// Set up the Apollo Server with Express
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
}

startServer();
```

## Running the Project

1. Run the server using the following command:

   ```bash
   node index.js
   ```

2. Open the browser and go to `http://localhost:4000/graphql`.

## Example Queries

### Query: Get all books

```graphql
query {
  books {
    id
    title
    author
  }
}
```

### Mutation: Add a new book

```graphql
mutation {
  addBook(title: "The Great Gatsby", author: "F. Scott Fitzgerald") {
    id
    title
    author
  }
}
```

### Expected Output

After running the query to get all books, you should receive something like this:

```json
{
  "data": {
    "books": [
      { "id": "1", "title": "1984", "author": "George Orwell" },
      { "id": "2", "title": "Brave New World", "author": "Aldous Huxley" }
    ]
  }
}
```

After adding a new book, the response will look like this:

```json
{
  "data": {
    "addBook": {
      "id": "3",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  }
}
```
# RESULTS
![image](https://github.com/user-attachments/assets/89902b8b-8450-4596-956a-e611d835d979)


