const authResolverMiddleware = (resolverFunction: any) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    if (!context.req.user) {
      throw new Error("No JWT! Please set JWT in headers");
    }

    const resolved = await resolverFunction(parent, args, context, info);

    return resolved;
  } catch (error) {
    return new Error(error.message);
  }
};

export default authResolverMiddleware;
