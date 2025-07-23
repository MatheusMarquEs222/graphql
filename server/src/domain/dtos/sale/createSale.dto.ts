export interface ICreateSaleDTO {
    client: string; // ID do cliente
    items: Array<{
        product: string; // ID do produto
        quantity: number; // Quantidade do produto
        price?: number; // Preço unitário opcional
    }>;
    saleDate?: string;
}