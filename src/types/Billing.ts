export interface BillingOverview {
  currentPlan: string;
  monthlyUsage: number;
  usageLimit: number;
  totalAmount: number;
  nextBillingDate: string;
}