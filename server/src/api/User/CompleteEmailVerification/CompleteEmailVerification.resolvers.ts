import { User, Verification } from "src/entity";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse,
} from "src/types/graphql";
import { Resolvers } from "src/types/resolvers";
import authResolverMiddleware from "src/utils/authResolverMiddleware";

const resolver = async (
  _: any,
  args: CompleteEmailVerificationMutationArgs,
  { req }: { req: any }
): Promise<CompleteEmailVerificationResponse> => {
  const user: User = req.user;
  const { key } = args;

  try {
    if (!user.email) {
      return {
        ok: false,
        error: "User doesn't have email",
      };
    }
    const existingVerification = await Verification.findOne({
      payload: user.email,
      key,
    });

    if (!existingVerification) {
      return {
        ok: false,
        error: "Verification doesn't exist",
      };
    }

    user.verifiedEmail = true;
    user.save();

    return {
      ok: true,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerificationResponse: authResolverMiddleware(resolver),
  },
};
