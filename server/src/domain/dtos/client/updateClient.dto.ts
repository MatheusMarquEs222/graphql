export interface IUpdateClientDTO {
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zip: string;
    }
}