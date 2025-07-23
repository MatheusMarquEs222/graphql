import { IProduct, ProductModel } from "../../../infra/models/product.model";
import { ICreateProductDTO } from "../../dtos/product/createProduct.dto";
import { IProductRepository } from "../product.repository";

export class MongooseProductRepository implements IProductRepository {
    async create(data: ICreateProductDTO): Promise<IProduct> {
        return ProductModel.create(data);
    }
    async findAll(): Promise<IProduct[]> {
        return ProductModel.find();
    }
    async findByName(name: string): Promise<IProduct | null> {
        return ProductModel.findOne({ name }); 
    }
}