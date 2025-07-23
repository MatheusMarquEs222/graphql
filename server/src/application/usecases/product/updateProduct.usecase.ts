import { IUpdateProductDTO } from "../../../domain/dtos/product/updateProduct.dto";
import { IProductRepository } from "../../../domain/repositories/product.repository";

export const updateProductUseCase = async (
    id: string,
    data: IUpdateProductDTO,
    repo: IProductRepository
) => {
    return repo.update(id, data);
}