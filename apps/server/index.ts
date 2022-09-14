import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Truck {
    id: ID!
    name: String!
    description: String
    isLive: Boolean
    liveAddress: String
    schedules: [Schedule!]
    tags: [Tag!]
  }

  type Schedule {
    id: ID!
    address: String!
    description: String!
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Query {
    truck(id: ID!): Truck
    trucks(onlyLive: Boolean): [Truck]
  }

  input UpsertTruckType {
    name: String!
    description: String
  }

  input SetLiveType {
    id: ID!
    isLive: Boolean!
    liveAddress: String
  }

  input CreateScheduleType {
    truckId: ID!
    address: String!
    description: String!
  }

  input UpdateScheduleType {
    id: ID!
    address: String!
    description: String!
  }

  type Mutation {
    upsertTruck(truck: UpsertTruckType): Truck!
    setLive(setLiveInput: SetLiveType): Truck!
    deleteTruck(id: ID!): ID
    createSchedule(createScheduleInput: CreateScheduleType): Truck
    updateSchedule(updateScheduleInput: UpdateScheduleType): Truck
    deleteSchedule(id: ID!): Truck
  }
`;

const resolvers = {
  Query: {
    truck: (parent: any, args: any, context: any, info: any) =>
      prisma.truck.findFirst({
        where: { id: parseInt(args.id, 10) },
        include: { schedules: true, tags: true },
      }),
    trucks: (parent: any, args: any, context: any, info: any) => {
      let whereClause = {};
      if (args.onlyLive) {
        whereClause = { isLive: true };
      }
      return prisma.truck.findMany({
        where: whereClause,
        include: { schedules: true, tags: true },
      });
    },
  },
  Mutation: {
    upsertTruck: async (parent: any, args: any, context: any, info: any) =>
      await prisma.truck.upsert({
        where: { name: args.truck.name },
        update: {
          ...args.truck,
        },
        create: {
          ...args.truck,
        },
      }),
    setLive: async (parent: any, args: any, context: any, info: any) =>
      await prisma.truck.update({
        where: { id: parseInt(args.setLiveInput.id, 10) },
        data: {
          isLive: args.setLiveInput.isLive,
          liveAddress: args.setLiveInput.liveAddress,
        },
      }),
    deleteTruck: async (parent: any, args: any, context: any, info: any) =>
      (await prisma.truck.delete({ where: { id: parseInt(args.id) } })).id,
    createSchedule: async (parent: any, args: any, context: any, info: any) => {
      const schedule = await prisma.schedule.create({
        data: {
          address: args.createScheduleInput.address,
          description: args.createScheduleInput.description,
          truck: {
            connect: { id: parseInt(args.createScheduleInput.truckId, 10) },
          },
        },
        include: { truck: { include: { schedules: true } } },
      });
      return schedule?.truck;
    },
    updateSchedule: async (parent: any, args: any, context: any, info: any) => {
      const schedule = await prisma.schedule.update({
        where: { id: parseInt(args.updateScheduleInput.id, 10) },
        data: args.updateScheduleInput,
        include: { truck: { include: { schedules: true } } },
      });
      return schedule?.truck;
    },
    deleteSchedule: async (parent: any, args: any, context: any, info: any) => {
      const schedule = await prisma.schedule.delete({
        where: { id: parseInt(args.id) },
        include: { truck: { include: { schedules: true } } },
      });
      return schedule?.truck;
    },
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
