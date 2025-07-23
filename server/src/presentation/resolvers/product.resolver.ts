import { createProductUseCase } from "../../application/usecases/product/createProduct.usecase";
import { listProductUseCase } from "../../application/usecases/product/listProduct.usecase";
import { updateProductUseCase } from "../../application/usecases/product/updateProduct.usecase";
import { MongooseProductRepository } from "../../domain/repositories/mongoose/mongooseProduct.repository";

const productRepo = new MongooseProductRepository();

const productResolver = {
    Query: {
        products: async () => {
            return listProductUseCase(productRepo);
        },
    },
    Mutation: {
        createProduct: async (_: any, { input }: any) => {
            return createProductUseCase(input, productRepo);
        },

        updateProduct: async (_: any, { id, input }: any) => {
            return updateProductUseCase(id, input, productRepo);
        }
    },
}

export default productResolver;