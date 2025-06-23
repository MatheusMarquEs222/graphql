import { ICreateSaleDTO } from "../../../domain/dtos/sale/createSale.dto";
import { ISaleRepository } from "../../../domain/repositories/sale.repository";

export const createSaleUseCase = async (
    input: ICreateSaleDTO, 
    repo: ISaleRepository
) => {
    return repo.create(input);
}