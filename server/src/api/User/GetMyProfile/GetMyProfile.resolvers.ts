import authResolverMiddleware from "../../../utils/authResolverMiddleware";
import { GetMyProfileResponse } from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";

const resolver = async (
  _: any,
  args: any,
  { req }: { req: any }
): Promise<GetMyProfileResponse> => {
  const { user } = req;

  return {
    ok: true,
    error: null,
    user,
  };
};

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: authResolverMiddleware(resolver),
  },
};

export default resolvers;
