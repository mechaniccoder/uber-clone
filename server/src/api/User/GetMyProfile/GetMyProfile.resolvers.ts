import { GetMyProfileResponse } from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: async (_, args, { req }): Promise<GetMyProfileResponse> => {
      const { user } = req;
      console.log(user);
      return {
        ok: true,
        error: null,
        user,
      };
    },
  },
};

export default resolvers;
