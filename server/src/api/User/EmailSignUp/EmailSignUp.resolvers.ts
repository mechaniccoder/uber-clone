import { verificationTarget } from "src/types";
import { sendVerificationEmail } from "src/utils/sendEmail";
import { User, Verification } from "../../../entity";
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
      const { email, phoneNumber } = args;

      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: "User already existed with this email",
            token: null,
          };
        }

        const ExistingPhoneVerification = await Verification.findOne({
          payload: phoneNumber,
          verified: true,
        });

        if (!ExistingPhoneVerification) {
          return {
            ok: false,
            error: "You didn't verify phone number",
            token: null,
          };
        }

        const newUser = await User.create({ ...args }).save();

        if (!newUser) {
          return {
            ok: false,
            error: "Failed to sign up new user",
            token: null,
          };
        }

        if (!newUser.email) {
          return {
            ok: false,
            error: "You don't have email!",
            token: null,
          };
        }

        const emailVerification = await Verification.create({
          payload: newUser.email,
          target: verificationTarget.EMAIL,
        }).save();

        await sendVerificationEmail(newUser.fullName, emailVerification.key);

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
