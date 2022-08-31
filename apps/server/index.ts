const { ApolloServer, gql } = require("apollo-server");
// type Schedule {
//     id: ID!
//     dayOfWeek: DaysOfWeek!
//     address: string <- Should this be a string or a more complex type?
//     open: Time!
//     close: Time!
//   }

//   type Tag {
//     id: ID!
//     name: string!
//   }

//   enum DaysOfWeek {
//     SUNDAY
//     MONDAY
//     TUESDAY
//     WEDNESDAY
//     THURSDAY
//     FRIDAY
//     SATURDAY
//   }
const typeDefs = gql`
  type Truck {
    id: ID!
    name: String!
    description: String
    # schedules: [Schedule!]
    # tags: [Tag!]
  }

  type Query {
    truck(id: ID!): Truck
    trucks: [Truck]
  }
`;

const trucks = [
  { id: 1, name: "Rosari's", description: "Papusas" },
  { id: 2, name: "Mary Ellen's", description: "Soul food" },
];

const resolvers = {
  Query: {
    trucks: () => trucks,
    truck: (id: number) => trucks.find((f) => f.id === id),
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
