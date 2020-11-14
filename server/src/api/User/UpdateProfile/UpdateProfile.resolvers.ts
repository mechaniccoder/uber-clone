import { Resolvers } from "src/types/resolvers";
import authResolverMiddleware from "src/utils/authResolverMiddleware";
import {
  UpdateProfileMutationArgs,
  UpdateProfileResponse,
} from "src/types/graphql";
import { User } from "src/entity";

const resolver = async (
  _: any,
  args: UpdateProfileMutationArgs,
  { req }: { req: any }
): Promise<UpdateProfileResponse> => {
  const user: User = req.user;
  const newArgsWithNotNullValue: any = {};

  for (let key in args) {
    if (args[key] !== null) {
      newArgsWithNotNullValue[key] = args[key];
    }
  }

  try {
    await User.update({ id: user.id }, { ...newArgsWithNotNullValue });

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
    UpdateProfile: authResolverMiddleware(resolver),
  },
};

export default resolvers;
