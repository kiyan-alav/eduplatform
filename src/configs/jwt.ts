import jwt from "jsonwebtoken";
import { ENV } from "./env";

export interface JwtPayload {
  userId: string;
  role: string;
}

export const signAccessToken = function (payload: JwtPayload) {
  return jwt.sign(payload, ENV.ACCESS_SECRET_KEY, {
    algorithm: "ES512",
    expiresIn: "8h",
  });
};

export const verifyAccessToken = function (token: string): JwtPayload {
  return jwt.verify(token, ENV.ACCESS_SECRET_KEY) as JwtPayload;
};
