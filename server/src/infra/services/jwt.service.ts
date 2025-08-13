import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { IJwtService } from "../../domain";
import { IUser } from "../models/user.model";

const ACCESS_SECRET: Secret = (process.env.JWT_ACCESS_SECRET ?? "dev_access_secret") as Secret;
const REFRESH_SECRET: Secret = (process.env.JWT_REFRESH_SECRET ?? "dev_refresh_secret") as Secret;
const ACCESS_EXPIRES: SignOptions["expiresIn"] = (process.env.JWT_ACCESS_EXPIRES ?? "15m") as SignOptions["expiresIn"];
const REFRESH_EXPIRES: SignOptions["expiresIn"] = (process.env.JWT_REFRESH_EXPIRES ?? "7d") as SignOptions["expiresIn"];

export class JwtService implements IJwtService {
  signAccess(user: IUser): string {
    const payload = { 
      email: user.email, 
      name: user.name, 
      role: user.role, 
      tokenVersion: user.tokenVersion 
    };
    
    const subject = String(user.id ?? user._id);
    const options: SignOptions = { subject, expiresIn: ACCESS_EXPIRES };
    
    return jwt.sign(payload, ACCESS_SECRET, options);
  }
  signRefresh(user: Partial<IUser>): string {
    const payload = { tokenVersion: user.tokenVersion };
    const subject = String(user.id ?? user._id);
    const options: SignOptions = { subject, expiresIn: REFRESH_EXPIRES };
    
    return jwt.sign(payload, REFRESH_SECRET, options);
  }
  verifyAccess(token: string) { return jwt.verify(token, ACCESS_SECRET) as any; }
  verifyRefresh(token: string) { return jwt.verify(token, REFRESH_SECRET) as any; }
}