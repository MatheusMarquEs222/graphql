import { IProduct } from "../../infra/models/product.model";
import { ICreateProductDTO } from "../dtos/product/createProduct.dto";

export interface IProductRepository {
    create(data: ICreateProductDTO): Promise<IProduct>;
    findByName(name: string): Promise<IProduct | null>;
    findAll(): Promise<IProduct[]>;
}