import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import Verification from "../../../entity/Verification";
import { verificationTarget } from "../../../types";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;

      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });

        if (existingVerification) {
          existingVerification.remove();
        }

        const newVerification = await Verification.create({
          target: verificationTarget.PHONE,
          payload: phoneNumber,
        });

        newVerification.save();
        await sendVerificationSMS(newVerification.payload, newVerification.key);

        console.log(newVerification);

        return {
          ok: true,
          error: null,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.messagee,
        };
      }
    },
  },
};

export default resolvers;
