import { IUser, UserModel } from "../../../infra/models/user.model";
import { USER_ROLE } from "../../services";
import { IUserRepository } from "../user.repository";

export class MongooseUserRepository implements IUserRepository {
    async create(data: any): Promise<IUser> {
        return UserModel.create({ 
            ...data, 
            tokenVersion: data.tokenVersion ?? 0 
        });
    }

    async findById(id: string): Promise<IUser | null> { 
        return UserModel.findById(id); 
    }

    async findByEmail(email: string): Promise<IUser | null> { 
        return UserModel.findOne({ email }); 
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser> {
        const doc = await UserModel.findByIdAndUpdate(
            id, 
            { $set: data }, 
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!doc) throw new Error("Usuário não encontrado");
        
        return doc;
    }

    async list(
        params: { 
            page: number; 
            pageSize: number; 
            term?: string; 
            role?: USER_ROLE 
        }
    ) {
        const { page, pageSize, term, role } = params;
        const query: any = {};
    
        if (term) {
            query.$or = [ 
                { name: { $regex: term, $options: 'i' } }, 
                { email: { $regex: term, $options: 'i' } } 
            ];
        }

        if (role) { 
            query.role = role;
        }

        const [items, total] = await Promise.all([
            UserModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * pageSize)
                .limit(pageSize),
                
            UserModel.countDocuments(query)
        ]);
        
        return { items, total };
    }
    async incrementTokenVersion(id: string): Promise<void> {
        await UserModel.findByIdAndUpdate(id, { $inc: { tokenVersion: 1 } });
    }
}