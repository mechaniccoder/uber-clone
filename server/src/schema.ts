import { Resolver } from "dns";
import { GraphQLSchema } from "graphql";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";

import path from "path";

const allTypes: GraphQLSchema[] = loadFilesSync(
  path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers = loadFilesSync(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypeDefs(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

export default schema;
