import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<any> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.JWT_SECRET!);
    context.req.userId = (payload as any).userId;
  } catch (err) {
    throw new Error("Not authenticated");
  }
  return next();
};