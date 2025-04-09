type Category = 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';

export interface IProduct {
  title: string;
  author: string;
  price: number;
  category: Category;
  description: string;
  quantity: number;
  inStock: boolean;
}
