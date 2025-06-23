import { IProductRepository } from "../../../domain/repositories/product.repository";

export const listProductUseCase = async (repo: IProductRepository) => {
    return repo.findAll();
}