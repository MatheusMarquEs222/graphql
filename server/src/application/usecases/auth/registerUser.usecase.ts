import { IPasswordHasher, IUserRepository } from "../../../domain";
import { IRegisterUserDTO } from "../../../domain/dtos/user/userAuth.dto";

export const registerUserUseCase = async (
  input: IRegisterUserDTO,
  repo: IUserRepository,
  hasher: IPasswordHasher,
) => {
  const exists = await repo.findByEmail(input.email.toLowerCase());
  if (exists) throw new Error("E_EMAIL_TAKEN");
  const passwordHash = await hasher.hash(input.password);
  return repo.create({
    name: input.name,
    email: input.email.toLowerCase(),
    role: input.role ?? 'USER',
    passwordHash,
    tokenVersion: 0,
  });
};
