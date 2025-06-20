import { ProductModel } from "../../infra/models/product.model";
import { SaleModel } from "../../infra/models/sale.model"
import { ScheduleModel } from "../../infra/models/schedule.model";

const saleResolver = {
    Query: {
        sales: async () => {
            return await SaleModel.find()
                .populate('client')
                .populate('items.product');
        },
    },
    Mutation: {
        createSale: async (_: any, { input }: any) => {
            const { client, items } = input;
            const processedItems = [];

            for (const item of items) {
                const product = await ProductModel.findById(item.product);
                
                if (!product) {
                    throw new Error(`Produto com ID ${item.product} não encontrado`);
                }

                const unitPrice = item.price !== undefined && item.price !== null
                    ? item.price
                    : product.price;

                processedItems.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: unitPrice,
                });
            }

            const sale = await SaleModel.create({
                client,
                items: processedItems,
                saleDate: new Date(),
            });

            // Criação dos agendamentos automáticos
            for (const item of processedItems) {
                const product = await ProductModel.findById(item.product);
                
                if (!product) continue;

                const maintenanceDate = new Date();
                
                maintenanceDate.setDate(
                    maintenanceDate.getDate() + product.maintenanceIntervalDays
                );

                await ScheduleModel.create({
                    client,
                    product: item.product,
                    sale: sale._id,
                    scheduledDate: maintenanceDate,
                    status: 'pending',
                    createdAt: new Date(),
                });
            }

            return sale;
        },
    },
};

export default saleResolver;