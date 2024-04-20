export interface IBasketSanitized {
  id: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  productName: string;
  price: number;
  rate: number;
  brand: string;
}

export interface IBasketResponse {
  totalPrice: number;
  total: number;
  productsQuantity: number;
  items: IBasketSanitized[];
}
