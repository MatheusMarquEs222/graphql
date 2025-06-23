import { ISale } from "../../infra/models/sale.model";
import { ICreateSaleDTO } from "../dtos/sale/createSale.dto";

export interface ISaleRepository {
    create(data: ICreateSaleDTO): Promise<ISale>;
    findAll(): Promise<ISale[]>;
}