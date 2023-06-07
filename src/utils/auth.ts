import { logger } from "./logger";

const jwt = require("jsonwebtoken");

const config = process.env;


const TOKEN_KEY = 'smartSolution'

export class Auth {
  constructor(){}
  verifyToken = (req: any, res: any, next: any) => {
    const token = req?.headers["authorization"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      logger.error(err)
      return res.status(401).send("Invalid Token",err);
    }
    return next();
  };
}
