import { createSaleUseCase } from "../../application/usecases/sale/createSale.usecase";
import { listSaleUseCase } from "../../application/usecases/sale/listSale.useCase";
import { MongooseSaleRepository } from "../../domain/repositories/mongoose/mongooseSale.repository";

const saleRepo = new MongooseSaleRepository();

const saleResolver = {
    Query: {
        sales: async () => {
            return listSaleUseCase(saleRepo);
        },
    },
    Mutation: {
        createSale: async (_: any, { input }: any) => {
            return createSaleUseCase(input, saleRepo)
        }
    },
};

export default saleResolver;