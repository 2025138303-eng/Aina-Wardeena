import { Product, HeelType } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Metropolis Pointed-Toe Heels',
    price: 129,
    description: 'The ultimate versatile heel designed for transition between day and night. Features our proprietary interchangeable heel technology.',
    baseImage: 'https://picsum.photos/seed/heels1/800/800',
    heelImages: {
      [HeelType.STILETTO]: 'https://picsum.photos/seed/stiletto/800/800',
      [HeelType.BLOCK]: 'https://picsum.photos/seed/block/800/800',
      [HeelType.MID]: 'https://picsum.photos/seed/mid/800/800',
    },
    colors: [
      { name: 'Cream', hex: '#F5F5DC', image: 'https://picsum.photos/seed/cream/800/800' },
      { name: 'Noir', hex: '#1A1A1A', image: 'https://picsum.photos/seed/noir/800/800' },
      { name: 'Taupe', hex: '#B3AAA4', image: 'https://picsum.photos/seed/taupe/800/800' },
      { name: 'Champagne', hex: '#F7E7CE', image: 'https://picsum.photos/seed/champagne/800/800' },
    ],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    rating: 4.8,
    reviewsCount: 124,
    category: 'Stiletto Heels'
  },
  {
    id: '2',
    name: 'Avenue Block Heel Sandals',
    price: 115,
    description: 'Modern aesthetic meets all-day comfort. The avenue block heel is a staple for the contemporary woman.',
    baseImage: 'https://picsum.photos/seed/heels2/800/800',
    heelImages: {
      [HeelType.STILETTO]: 'https://picsum.photos/seed/stiletto2/800/800',
      [HeelType.BLOCK]: 'https://picsum.photos/seed/block2/800/800',
      [HeelType.MID]: 'https://picsum.photos/seed/mid2/800/800',
    },
    colors: [
      { name: 'Tan', hex: '#D2B48C', image: 'https://picsum.photos/seed/tan/800/800' },
      { name: 'Black', hex: '#000000', image: 'https://picsum.photos/seed/blk/800/800' },
      { name: 'Wine', hex: '#722F37', image: 'https://picsum.photos/seed/wine/800/800' },
    ],
    sizes: [35, 36, 37, 38, 39, 40],
    rating: 4.9,
    reviewsCount: 89,
    category: 'Block Heels'
  },
  {
    id: '3',
    name: 'Elysian Ribbon Mid Heels',
    price: 139,
    description: 'A touch of elegance with soft ribbon detailing. Perfect for special occasions that demand both style and ease.',
    baseImage: 'https://picsum.photos/seed/heels3/800/800',
    heelImages: {
      [HeelType.STILETTO]: 'https://picsum.photos/seed/stiletto3/800/800',
      [HeelType.BLOCK]: 'https://picsum.photos/seed/block3/800/800',
      [HeelType.MID]: 'https://picsum.photos/seed/mid3/800/800',
    },
    colors: [
      { name: 'Pearl', hex: '#F0EAD6', image: 'https://picsum.photos/seed/pearl/800/800' },
      { name: 'Soft Pink', hex: '#FFB6C1', image: 'https://picsum.photos/seed/pink/800/800' },
    ],
    sizes: [36, 37, 38, 39],
    rating: 4.7,
    reviewsCount: 56,
    category: 'Mid Heels'
  }
];

export const VALUE_PROPS = [
  {
    title: 'Interchangeable Heels',
    description: 'Switch between stiletto, block, and mid heels in seconds.',
    icon: 'RefreshCw'
  },
  {
    title: 'Adaptive Cushioning',
    description: 'Extra insole cushioning that molds to your unique foot shape.',
    icon: 'Layers'
  },
  {
    title: 'AI Fit Scanner',
    description: 'Get your perfect size with our precision AI measurement tool.',
    icon: 'ScanFace'
  },
  {
    title: 'Global Shipping',
    description: 'Complimentary standard shipping on all international orders.',
    icon: 'Globe'
  }
];
