import { 
    IJwtService, 
    ILoginDTO, 
    IPasswordHasher, 
    IUserRepository 
} from "../../../domain";

export const loginUseCase = async (
  input: ILoginDTO,
  repo: IUserRepository,
  hasher: IPasswordHasher,
  jwt: IJwtService,
) => {
    const user = await repo.findByEmail(input.email.toLowerCase());

    if (!user) throw new Error("E_INVALID_CREDENTIALS");

    const ok = await hasher.verify(user.passwordHash, input.password);

    if (!ok) throw new Error("E_INVALID_CREDENTIALS");

    const accessToken = jwt.signAccess(user);
    const refreshToken = jwt.signRefresh(user);
    
    return { accessToken, refreshToken, user };
};