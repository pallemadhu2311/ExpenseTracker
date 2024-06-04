export interface ExpenseModel {
  sno?: number;
  transactionId: string;
  date: Date;
  time: string;
  amount: number;
  note: string;
  username: string;
}
