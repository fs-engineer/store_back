import { IBasketResponse } from '../basket.interface';
import { Basket } from '../entity/basket.entity';

export const sanitizeBasketCalcSumAndTotal = (
  baskets: Basket[],
): IBasketResponse => {
  const initialSummary: IBasketResponse = {
    totalPrice: 0,
    productsQuantity: 0,
    total: 0,
    items: [],
  };

  return baskets.reduce((acc: IBasketResponse, basket: Basket) => {
    acc.totalPrice += basket.product.price;
    acc.productsQuantity += basket.quantity;
    acc.total = baskets.length;
    acc.items.push({
      id: basket.id,
      productId: basket.id,
      productName: basket.product.name,
      price: basket.product.price,
      rate: basket.product.rate,
      brand: basket.product.brand.name,
      createdAt: basket.createdAt,
      updatedAt: basket.updatedAt,
    });
    return acc;
  }, initialSummary);
};
