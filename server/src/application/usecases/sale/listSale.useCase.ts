import { ISaleRepository } from "../../../domain/repositories/sale.repository";

export const listSaleUseCase = async (repo: ISaleRepository) => {
    return repo.findAll();
}