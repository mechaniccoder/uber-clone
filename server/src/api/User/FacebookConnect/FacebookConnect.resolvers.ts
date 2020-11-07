import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entity/User";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      try {
        const { facebookId } = args;
        const existingUser = User.findOne({ facebookId });

        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: "soon",
          };
        }

        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/v8.0/${facebookId}/picture`,
        });

        newUser.save();

        return {
          ok: true,
          error: null,
          token: "soon",
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
