import { createConnection } from "typeorm";
import { User } from "./entities/User";
import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GreetingResolver } from "./resolvers/greeting";
import { UserResolver } from "./resolvers/user";

console.log(process.env)

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'jwt-graphql',
    username: process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User]
  })

  
  const app = express()
  const httpServer = createServer(app)
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [GreetingResolver, UserResolver]
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      ApolloServerPluginLandingPageGraphQLPlayground
    ]
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({app})

  const PORT = process.env.PORT || 4000

  await new Promise(resolve => httpServer.listen({port: PORT}, resolve as () => void ))

  console.log(`SERVER STARTED ON PORT ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}${apolloServer.graphqlPath}`);
}


main().catch(err => console.log('ERROR START SERVER:', err))
