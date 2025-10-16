import data from '../data.json'
import type { Product, CartItem } from './types'
import { useState } from 'react';
import AddButton from './components/AddButton';
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

  return (
    <>
    <div className='desserts__wrapper'>
      <div className='desserts__body'>
        <h1 className='desserts__title'>Desserts</h1>

        <div className='products__grid'>
          {products.map((product) => (
            <div key={product.id} className='product__card'>
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
                />
              <p>{product.category}</p>
              <h2 className='product__name'>{product.name}</h2>
              <p className='product__price'>${product.price.toFixed(2)}</p>
              
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}

export default App
