import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Truck {
    id: ID!
    name: String!
    description: String
    schedules: [Schedule!]
    tags: [Tag!]
  }

  type Schedule {
    id: ID!
    dayOfWeek: DaysOfWeek!
    address: String
    open: Int!
    close: Int!
    recurring: Boolean!
    endOfRecurring: Int
  }

  type Tag {
    id: ID!
    name: String!
  }

  enum DaysOfWeek {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

  type Query {
    truck(id: ID!): Truck
    trucks: [Truck]
  }
`;

const resolvers = {
  Query: {
    truck: (parent: any, args: any, context: any, info: any) =>
      prisma.truck.findFirst({
        where: { id: parseInt(args.id, 10) },
        include: { schedules: true, tags: true },
      }),
    trucks: () =>
      prisma.truck.findMany({ include: { schedules: true, tags: true } }),
  },
};

import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
