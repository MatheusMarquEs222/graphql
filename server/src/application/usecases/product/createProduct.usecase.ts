import { AppError } from '../../../errors/AppError';
import { ICreateProductDTO } from "../../../domain/dtos/product/createProduct.dto";
import { IProductRepository } from "../../../domain/repositories/product.repository";

export const createProductUseCase = async (
    input: ICreateProductDTO, 
    repo: IProductRepository
) => {
    if (!input.name || !input.price) {
        throw new AppError('Nome e preço são obrigatórios.', 400);
    }

    const exists = await repo.findByName(input.name);

    if (exists) {
        throw new AppError('Já existe um produto com este nome.', 400);
    }
    
    return repo.create(input);
}