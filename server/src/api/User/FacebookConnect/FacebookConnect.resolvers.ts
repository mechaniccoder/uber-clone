import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entity/User";
import createJWT from "../../../utils/createJWT";

const SANGGYU_FACEBOOK_ID = "100003309401100";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      try {
        const { facebookId } = args;
        const existingUser = await User.findOne({ facebookId });

        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: createJWT(existingUser.id),
          };
        }

        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/v8.0/${facebookId}/picture`,
        });

        await newUser.save();

        return {
          ok: true,
          error: null,
          token: createJWT(newUser.id),
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
