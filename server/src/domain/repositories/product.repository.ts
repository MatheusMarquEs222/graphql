import { IProduct } from "../../infra/models/product.model";
import { ICreateProductDTO } from "../dtos/product/createProduct.dto";
import { IUpdateProductDTO } from "../dtos/product/updateProduct.dto";

export interface IProductRepository {
    create(data: ICreateProductDTO): Promise<IProduct>;
    findAll(): Promise<IProduct[]>;
    update(id: string, input: IUpdateProductDTO): Promise<IProduct>
}