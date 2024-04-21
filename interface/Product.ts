export interface Product {
  objectID?: string;
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategories: string[];
  price: number;
  discount: number;
  images: string[];
  stock: number;
  attributes: Record<string, string>; // Flexible attribute structure
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
  rating: number;
}
