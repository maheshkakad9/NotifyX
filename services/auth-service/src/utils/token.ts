import jwt, { Secret, SignOptions } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as Secret;

const ACCESS_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];
const REFRESH_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY } as SignOptions
  );

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY } as SignOptions
  );

  return { accessToken, refreshToken };
};
