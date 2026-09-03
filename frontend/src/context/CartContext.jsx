import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token, isAuthenticated, openAuth } = useAuth();
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem('thriftcampus_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('thriftcampus_cart', JSON.stringify(items));
  }, [items]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product) => {
    if (!isAuthenticated) {
      openAuth('login');
      showToast('Please log in or join to add pieces to your bag.', 'info');
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Updated quantity for "${product.name}"`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`Added "${product.name}" to your bag!`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // If logged in, sync with backend
    if (user && token) {
      apiService.addItemToCart(user.userId, product.id, token).catch(() => {});
    }
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Piece removed from bag.', 'info');

    if (user && token) {
      apiService.removeItemFromCart(user.userId, productId, token).catch(() => {});
    }
  };

  const updateQuantity = (productId, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
    showToast('Shopping bag cleared.', 'info');
  };

  const checkout = async () => {
    if (!isAuthenticated) {
      openAuth('login');
      showToast('Please log in or join to place an order.', 'info');
      return;
    }

    if (items.length === 0) {
      showToast('Your bag is empty.', 'error');
      return;
    }

    try {
      const order = await apiService.checkout(user ? user.userId : 1, token);
      clearCart();
      setIsDrawerOpen(false);
      showToast(`Order #${order.id || '90412'} Placed! Ready for campus drop.`, 'success');
      return order;
    } catch (err) {
      showToast(err.message || 'Checkout failed', 'error');
    }
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        isDrawerOpen,
        toastMessage,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
