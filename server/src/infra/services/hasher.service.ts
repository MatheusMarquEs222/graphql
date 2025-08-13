import argon2 from "argon2";
import { IPasswordHasher } from "../../domain";
export class Argon2Hasher implements IPasswordHasher {
  hash(plain: string) { return argon2.hash(plain); }
  verify(hash: string, plain: string) { return argon2.verify(hash, plain); }
}
