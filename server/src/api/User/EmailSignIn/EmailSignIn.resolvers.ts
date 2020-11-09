import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entity/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            ok: false,
            error: "no user with the email",
            token: null,
          };
        }

        const isPasswordRight = await user.comparePassword(password);

        if (!isPasswordRight) {
          return {
            ok: false,
            error: "password not right",
            token: null,
          };
        }

        return {
          ok: true,
          error: null,
          token: createJWT(user.id),
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
