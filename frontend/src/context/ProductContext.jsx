import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { INITIAL_PRODUCTS } from '../data/mockData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    loadProducts(selectedCategory === 'All' ? null : selectedCategory);
  }, [selectedCategory]);

  const loadProducts = async (cat = null) => {
    setLoading(true);
    try {
      const data = await apiService.getProducts(cat);
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } catch {
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData, token) => {
    const created = await apiService.createProduct(productData, token);
    setProducts((prev) => [created, ...prev]);
    setIsUploadModalOpen(false);
    return created;
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.curator && p.curator.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.campus && p.campus.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (selectedCategory.toLowerCase().includes(p.category.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        filteredProducts,
        allProducts: products,
        loading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isUploadModalOpen,
        setIsUploadModalOpen,
        addProduct,
        refreshProducts: () => loadProducts(selectedCategory === 'All' ? null : selectedCategory)
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}
