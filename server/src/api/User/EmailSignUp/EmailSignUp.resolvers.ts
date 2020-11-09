import { User } from "../../../entity";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;

      try {
        const existingUser = User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: "User already existed with this email",
            token: null,
          };
        }

        const newUser = await User.create({ ...args });

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
