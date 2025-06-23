import { ICreateProductDTO } from "../../../domain/dtos/product/createProduct.dto";
import { IProductRepository } from "../../../domain/repositories/product.repository";

export const createProductUseCase = async (
    input: ICreateProductDTO, 
    repo: IProductRepository
) => {
    return repo.create(input);
}