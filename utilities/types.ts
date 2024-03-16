export interface review {
  user: string;
  rating: Number;
  comment: string;
}

export interface Product {
  objectId?: string | "";
  _hightlightResult?: any | [];
  id: string | "";
  name?: string | "";
  description?: string | "";
  brand?: string | "";
  category?: string | "";
  subcategories?: string[] | [];
  price?: Number | 0;
  discount?: Number | 0;
  images?: string[] | [];
  stock?: Number | 0;
  attributes?: {
    [key: string]: string | "";
  };
  reviews?: review[] | [];
  rating?: number | 0;
}
