import { User, Verification } from "../../../entity";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;

      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });

        if (!existingVerification) {
          return {
            ok: false,
            error: "Verification key is not valid",
            token: null,
          };
        }

        existingVerification.verified = true;
        existingVerification.save();

        const existingUser = await User.findOne({ phoneNumber });

        if (!existingUser) {
          return {
            ok: true,
            error: null,
            token: null,
          };
        }

        existingUser.verifiedPhoneNumber = true;
        existingUser.save();

        return {
          ok: true,
          error: null,
          token: "comming soon",
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
