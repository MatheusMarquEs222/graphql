import { IJwtService, IUserRepository } from "../../../domain";

export const refreshTokenUseCase = async (
  token: string,
  repo: IUserRepository,
  jwt: IJwtService,
) => {
    const payload = jwt.verifyRefresh(token);
    
    if (!payload.sub) {
        throw new Error('SUB not found');
    }

    const user = await repo.findById(payload.sub);
    
    if (!user) {
        throw new Error("E_USER_NOT_FOUND");
    }
    
    if (user.tokenVersion !== payload.tokenVersion) {
        throw new Error("E_TOKEN_REVOKED");
    }
  
    return {
        accessToken: jwt.signAccess(user),
        refreshToken: jwt.signRefresh(user),
        user,
    };
};
