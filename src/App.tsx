import data from '../data.json'
import type { Product, CartItem } from './types'
import { useState } from 'react';
import AddButton from './components/AddButton';
import Cart from './components/Cart';
import './App.css'



function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = data.map((item, i) => ({
    id: `prod-${i}`,
    image: typeof item.image === 'string'
      ? item.image
      : item.image?.mobile ?? item.image?.desktop ?? item.image?.tablet ?? item.image?.thumbnail ?? '',
    name: item.name,
    category: item.category,
    price: item.price,
  }))

  const getCartQuantity = (productId: string): number => {
    const item = cart.find((cartItem) => cartItem.product.id === productId);
    return item ? item.quantity : 0;
  };


const handleAddToCart = (product: Product) => {
  // Resolve image URL before adding to cart
  const resolvedProduct = {
    ...product,
    image: product.image.startsWith('./')
      ? new URL(product.image, import.meta.url).href
      : product.image
  };

  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      return prevCart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    
    return [...prevCart, { product: resolvedProduct, quantity: 1 }];
  });
};
const handleClearCart = () => {
    setCart([]);
  };

const handleIncrease = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    if (productId === 'ALL') {
      setCart([]);
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    }
  };

  return (
    <>
    <div className='desserts__wrapper'>
      <div className='desserts__body'>
        <h1 className='desserts__title'>Desserts</h1>

        <div className='products__grid'>
          {products.map((product) => (
            <div key={product.id} className='product__card'>
              <div className='product__image-container'>
              <img
                className='product__image'
                src={
                  product.image.startsWith('./')
                    ? new URL(product.image, import.meta.url).href
                    : product.image
                }
                alt={product.name}
                loading='lazy'

                
              />
                <AddButton 
                quantity={getCartQuantity(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onIncrease={() => handleIncrease(product.id)}
                onDecrease={() => handleDecrease(product.id)} orderConfirmed={false}
              />
              </div>
                <div className='product__info'>
                  <p>{product.category}</p>
                  <h2 className='product__name'>{product.name}</h2>
                  <p className='product__price'>${product.price.toFixed(2)}</p>
              </div>

            </div>
          ))}
        </div>
      
      </div>
       <Cart
          cart={cart}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
    </div>
    </>
  )
}

export default App
