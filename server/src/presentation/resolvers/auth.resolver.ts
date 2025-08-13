import { getMeUseCase } from "../../application/usecases/auth/getMe.usecase";
import { getUserByIdUseCase } from "../../application/usecases/auth/getUserById.usecase";
import { listUsersUseCase } from "../../application/usecases/auth/listUsers.usecase";
import { loginUseCase } from "../../application/usecases/auth/login.usecase";
import { refreshTokenUseCase } from "../../application/usecases/auth/refreshToken.usecase";
import { registerUserUseCase } from "../../application/usecases/auth/registerUser.usecase";
import { revokeSessionsUseCase } from "../../application/usecases/auth/revokeSessuibs.usecase";
import { updateUserUseCase } from "../../application/usecases/auth/updateUser.usecase";
import { MongooseUserRepository } from "../../domain";
import { Argon2Hasher } from "../../infra/services/hasher.service";
import { JwtService } from "../../infra/services/jwt.service";

const userRepo = new MongooseUserRepository();
const jwt = new JwtService();
const hasher = new Argon2Hasher();

function getAuth(ctx: any) {
    const header = ctx?.req.headers?.authorization;
    if (!header || !header.startsWith("Bearer ")) return null;

    const token = header.slice(7);
    try { return jwt.verifyAccess(token); } catch { return null; }
}

function requireAuth(ctx: any) {
    const auth = getAuth(ctx);
    if (!auth) throw new Error('E_UNAUTHENTICATED');
    return auth;
}

function requireRole(ctx: any, roles: Array<'ADMIN' | 'MANAGER' | 'USER'>) {
    const auth = requireAuth(ctx);
    if (!roles.includes(auth.role)) throw new Error('E_FORBIDDEN');
    return auth;
}

const authResolver = {
    Query: {
        me: async (_: any, __: any, ctx: any) => {
            const auth = requireAuth(ctx);
            return getMeUseCase(auth.sub, userRepo);
        },
        user: async (_: any, { id }: any, ctx: any) => {
            requireRole(ctx, ['ADMIN']);
            return getUserByIdUseCase(id, userRepo);
        },
        users: async (
            _: any, 
            { 
                page = 1, 
                pageSize = 20, 
                term, 
                role 
            }: any, 
            ctx: any
        ) => {
            requireRole(ctx, ['ADMIN']);
            const res = await listUsersUseCase({page, pageSize, term, role}, userRepo);
            return {items: res.items, pageInfo: {page, pageSize, total: res.total } };
        },
    },
    Mutation: {
        registerUser: async (_: any, { input }: any, ctx: any) => {
            requireRole(ctx, ['ADMIN']);
            return registerUserUseCase(input, userRepo, hasher);
        },
        login: async (_: any, { email, password }: any) => {
            return loginUseCase({ email, password }, userRepo, hasher, jwt);
        },
        refreshToken: async (_: any, { token }: any) => {
            return refreshTokenUseCase(token, userRepo, jwt);
        },
        revokeMySessions: async (_: any, __: any, ctx: any) => {
            const auth = requireAuth(ctx);
            await revokeSessionsUseCase(auth.sub, userRepo);
            return true;
        },
        updateUser: async (_: any, { id, input }: any, ctx: any) => {
            const auth = requireAuth(ctx);
            const isAdmin = auth.role === 'ADMIN';
            if (!isAdmin && auth.sub !== id) throw new Error('E_FORBIDDEN');

            const safeInput = isAdmin ? input: { name: input?.name };
            return updateUserUseCase(id, safeInput, userRepo, hasher);
        },
    },
};

export default authResolver;