import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export function JWT_Auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token)
      return res.status(403).json({ messge: "JWT token not provided" });

    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET)
      return res.status(403).json({ message: "JWT Secret not provided!" });

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decodedToken.username;

    next();
  } catch (e) {
    console.error("Something went wrong in JWT Auth middleware\nError : " + e);
    return res.status(403).json({ message: "Token authentication failed!" });
  }
}
