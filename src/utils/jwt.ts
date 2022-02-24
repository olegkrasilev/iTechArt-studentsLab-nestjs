import * as jwt from "jsonwebtoken";
import { addMinutes, addDays } from "date-fns";
import { Response } from "express";

const cookieAccessOptions = {
  expires: addMinutes(
    new Date(),
    Number(process.env.JWT_COOKIE_ACCESS_EXPIRES_IN)
  ),
  httpOnly: true,
  secure: false,
};

const cookieRefreshOptions = {
  expires: addDays(
    new Date(),
    Number(process.env.JWT_COOKIE_REFRESH_EXPIRES_IN)
  ),
  httpOnly: true,
  secure: false,
};

if (process.env.NODE_ENV === "production") {
  cookieAccessOptions.secure = true;
  cookieRefreshOptions.secure = true;
}

export const createRefreshAccessToken = (id: number, response: Response) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  response.cookie("jwtAccessToken", accessToken, cookieAccessOptions);
  response.cookie("jwtRefreshToken", refreshToken, cookieRefreshOptions);

  return { refreshToken, accessToken };
};

export const createNewAccessToken = (id: number, response: Response) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  response.cookie("jwtAccessToken", accessToken, cookieAccessOptions);

  return accessToken;
};
