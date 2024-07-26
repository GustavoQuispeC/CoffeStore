// Generated by https://quicktype.io

export interface IProductList {
  id: string;
  article_id: string;
  description: string;
  imgUrl: string;
  price: string;
  stock: string;
  discount: string;
  averageRating: string;
  isAvailable: boolean;
  isDeleted: boolean;
  category: Category;
  presentacion?: string;
  tipoGrano?: string;
  quantity?: number;
  medida?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface IProductResponse {
  article_id: string;
  description: string;
  imgUrl: string;
  price: string;
  stock: string;
  discount: string;
  presentacion?: string;
  tipoGrano?: string;
  medida?: string;
  categoryID: string;
}

export interface IProductErrorResponse {
  article_id: string;
  description: string;
  imgUrl: string;
  price: string;
  stock: string;
  discount: string;
  presentacion?: string;
  tipoGrano?: string;
  medida?: string;
  categoryID: string;
}

export interface IProductUpdate {
  article_id: string;
  description: string;
  imgUrl: string;
  price: string;
  stock: string;
  discount: string;
  presentacion: string;
  tipoGrano: string;
  medida: string;
  category: Category;
}

export interface IProductErrorUpdate {
  article_id: string;
  description: string;
  imgUrl: string;
  price: string;
  stock: string;
  discount: string;
  presentacion: string;
  tipoGrano: string;
  medida: string;
  category: Category;
}
