export interface PaymentMethod {
  id: string;
  cardType: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}