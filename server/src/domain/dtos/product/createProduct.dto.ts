export interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
    maintenanceIntervalDays?: number;
}