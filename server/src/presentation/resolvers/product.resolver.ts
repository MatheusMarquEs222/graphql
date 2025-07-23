import { GraphQLError } from "graphql";
import { createProductUseCase } from "../../application/usecases/product/createProduct.usecase";
import { listProductUseCase } from "../../application/usecases/product/listProduct.usecase";
import { MongooseProductRepository } from "../../domain/repositories/mongoose/mongooseProduct.repository";
import { AppError } from "../../errors/AppError";

const productRepo = new MongooseProductRepository();

const productResolver = {
    Query: {
        products: async () => {
            return listProductUseCase(productRepo);
        },
    },
    Mutation: {
        createProduct: async (_: any, { input }: any) => {
            try {
                return await createProductUseCase(input, productRepo);
            } catch (error) {
                if (error instanceof AppError) {
                    throw new GraphQLError(error.message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            status: error.statusCode
                        }
                    });
                }
                console.error('Erro inesperado: ', error);
                throw new GraphQLError('erro interno no servidor', {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }
        },
    },
}

export default productResolver;