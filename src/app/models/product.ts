export interface Product {
    _id: string;
    productId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    quantity?: number;
}
