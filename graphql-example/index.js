// index.js
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { books } = require("./data");

// Definir el esquema (schema)
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

// Definir los resolvers
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

// Configurar Apollo Server
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 Servidor listo en http://localhost:4000/graphql");
  });
}

startServer();
