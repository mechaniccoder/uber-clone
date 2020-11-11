import jwt from "jsonwebtoken";
import User from "../entity/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const { id } = decodedToken;
    console.log(decodedToken);
    const user = await User.findOne({ id });

    return user;
  } catch (error) {
    return;
  }
};

export default decodeJWT;
