import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { connectDatabase } from './config/database';
import { validateEnv } from './utils/validateEnv';
import { isAuth } from './middleware/isAuth';

async function startServer() {
  validateEnv();

  const app = express();

  await connectDatabase();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, isAuth }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});