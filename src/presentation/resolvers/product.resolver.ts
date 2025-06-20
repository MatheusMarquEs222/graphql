import { ProductModel } from "../../infra/models/product.model"

const productResolver = {
    Query: {
        products: async () => {
            return await ProductModel.find();
        },
    },
    Mutation: {
        createProduct: async (_: any, { input }: any) => {
            const product = await ProductModel.create(input);
            return product;
        },
    },
}

export default productResolver;