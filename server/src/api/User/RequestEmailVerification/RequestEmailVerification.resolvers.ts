import { Resolvers } from "src/types/resolvers";
import { RequestEmailVerificationResponse } from "src/types/graphql";
import authResolverMiddleware from "src/utils/authResolverMiddleware";
import { User, Verification } from "src/entity";
import { verificationTarget } from "src/types";
import { sendVerificationEmail } from "src/utils/sendEmail";

const resolver = async (
  _: any,
  __: any,
  { req }: { req: any }
): Promise<RequestEmailVerificationResponse> => {
  const user: User = req.user;

  try {
    if (!user.email) {
      return {
        ok: false,
        error: "user doesn't have email",
      };
    }

    if (user.verifiedEmail) {
      return {
        ok: false,
        error: "You are already verified",
      };
    }

    const oldVerification = await Verification.findOne({
      payload: user.email,
    });

    if (oldVerification) {
      oldVerification.remove();
    }

    const newVerification = await Verification.create({
      payload: user.email,
      target: verificationTarget.EMAIL,
    }).save();

    await sendVerificationEmail(user.fullName, newVerification.key);

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
    RequestEmailVerification: authResolverMiddleware(resolver),
  },
};

export default resolvers;
