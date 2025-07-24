import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const smpleUsers = [
  { id: "1", name: "Alice", age: 30, isMarried: false },
  { id: "2", name: "Bob", age: 25, isMarried: true },
  { id: "3", name: "Charlie", age: 35, isMarried: true },
];

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
    }
`;
const resolvers = {
  Query: {
    getUsers: () => smpleUsers,
    getUserById: (_, { id }) => smpleUsers.find((user) => user.id === id),
  },
  Mutation: {
    createUser: (_, { name, age, isMarried }) => {
      const newUser = {
        id: String(smpleUsers.length + 1),
        name,
        age,
        isMarried,
      };
      smpleUsers.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server running at ${url}`);
