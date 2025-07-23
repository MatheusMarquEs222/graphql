import { IProduct, ProductModel } from "../../../infra/models/product.model";
import { ICreateProductDTO } from "../../dtos/product/createProduct.dto";
import { IUpdateProductDTO } from "../../dtos/product/updateProduct.dto";
import { IProductRepository } from "../product.repository";

export class MongooseProductRepository implements IProductRepository {
    async create(data: ICreateProductDTO): Promise<IProduct> {
        return ProductModel.create(data);
    }
    async findAll(): Promise<IProduct[]> {
        return ProductModel.find();
    }
    async update(id: string, input: IUpdateProductDTO): Promise<IProduct> {
        const product = await ProductModel.findByIdAndUpdate(
            id, 
            input, 
            { new: true }
        );

        if (!product) {
            throw new Error('Produto não encontrado')
        }

        return product;
    }
    async findByName(name: string): Promise<IProduct | null> {
        return ProductModel.findOne({ name }); 
    }
}