import { Request } from "express";
import passport from "passport";

export const expressAuthentication = (
  request: Request,
  securityName: string,
) => {
  return new Promise((resolve, reject) => {

    if (securityName === "jwt") {

      passport.authenticate(
        "jwt",
        { session: false },
        (err: any, user: any) => {

          if (err || !user) {
            reject(new Error("Unauthorized"));
            return;
          }

          request.user = user;
          resolve(user);
        }
      )(request);
    }
  });
};