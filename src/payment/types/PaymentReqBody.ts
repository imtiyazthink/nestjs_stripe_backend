import { Product } from './Product';

export interface PaymentReqBody {
  products: Product[];
  currency: string;
}
