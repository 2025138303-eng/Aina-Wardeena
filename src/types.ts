export enum HeelType {
  STILETTO = 'Stiletto',
  BLOCK = 'Block',
  MID = 'Mid',
}

export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  baseImage: string;
  heelImages: Record<HeelType, string>;
  colors: ColorOption[];
  sizes: number[];
  rating: number;
  reviewsCount: number;
  category: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  color: string;
  heelType: HeelType;
  size: number;
  quantity: number;
  image: string;
}

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';
