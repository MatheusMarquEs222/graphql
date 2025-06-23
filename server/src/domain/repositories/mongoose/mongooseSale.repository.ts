import { ProductModel } from "../../../infra/models/product.model";
import { ISale, SaleModel } from "../../../infra/models/sale.model";
import { ScheduleModel } from "../../../infra/models/schedule.model";
import { ICreateSaleDTO } from "../../dtos/sale/createSale.dto";
import { ISaleRepository } from "../sale.repository";

export class MongooseSaleRepository implements ISaleRepository {
    async create(data: ICreateSaleDTO): Promise<ISale> {
        const { client, items } = data;
        const processedItems = [];

        for (const item of items) {
            const product = await ProductModel.findById(item.product);
            
            if (!product) {
                throw new Error(`Produto com ID ${item.product} não encontrado`);
            }

            if (item.quantity <= 0) {
                throw new Error(`Quantidade inválida para o produto com ID ${item.product}`);
            }

            let unitPrice: number;
            if (item.price !== undefined && item.price !== null) {
                unitPrice = item.price;
            } else {
                unitPrice = product.price * item.quantity;
            }                

            processedItems.push({
                product: item.product,
                quantity: item.quantity,
                price: unitPrice,
            });
        }

        const totalValue = processedItems.reduce(
            (acc, item) => acc + item.price, 0
        );

        const sale = await SaleModel.create({
            client,
            items: processedItems,
            totalValue,
            saleDate: new Date(),
        });

        // Criação dos agendamentos automáticos
        for (const item of processedItems) {
            const product = await ProductModel.findById(item.product);

            if (!product?.maintenanceIntervalDays) {
                break;
            }
            
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
        };

        return sale.populate('client items.product');
    }

    async findAll(): Promise<ISale[]> {
        return SaleModel.find().populate('client').populate('items.product');
    }
}