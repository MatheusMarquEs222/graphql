import { 
    IPasswordHasher, 
    IUpdateUserDTO, 
    IUserRepository 
} from "../../../domain";

export const updateUserUseCase = async (
  id: string,
  input: IUpdateUserDTO,
  repo: IUserRepository,
  hasher: IPasswordHasher,
) => {
    const patch: any = {};
    
    if (input.name) {
        patch.name = input.name;
    }
    
    if (input.role) {
        patch.role = input.role;
    }
    
    if (input.password) {
        patch.passwordHash = await hasher.hash(input.password);
    }
    
    return repo.update(id, patch);
};