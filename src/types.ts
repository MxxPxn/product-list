export interface Product {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
  
}

export interface CartItem{
    product: Product;
    quantity: number;
}