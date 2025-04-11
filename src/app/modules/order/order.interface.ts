export interface IOrder {
  email?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status?: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transectionStatus: string;
    ank_status: string,
    sp_code: string;
    sp_message: string;
    method:string;
    date_time: string;
  };
}
