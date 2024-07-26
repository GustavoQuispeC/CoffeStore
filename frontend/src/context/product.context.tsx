"use client"
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { IProductList } from '@/interfaces/IProductList';
import { getProducts } from '@/helpers/products.helper';

interface ProductContextType {
  allProducts: IProductList[];
  searchResults: IProductList[];
  searchProducts: (searchTerm: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<IProductList[]>([]);
  const [searchResults, setSearchResults] = useState<IProductList[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

  const searchProducts = (searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const results = allProducts.filter((product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <ProductContext.Provider value={{ allProducts, searchResults, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};