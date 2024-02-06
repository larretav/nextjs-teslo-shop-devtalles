import { CartProduct, Product } from '@/interfaces/product.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SummaryInformation } from './interfaces/summary-information'

interface State {
  cart: CartProduct[],
}

type Action = {

  addProductToCart: (product: CartProduct) => void,
  updateProductQuantity: (product: CartProduct, quantity: number) => void,
  removeProduct: (product: CartProduct) => void,
  getTotalItems: () => number
  getSummaryInformation: () => SummaryInformation
}

export const useCartStore = create<State & Action>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();

        const subTotal = cart.reduce((subTotal, product) => product.quantity * product.price + subTotal, 0)
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsCart = getTotalItems();
        // const itemsCart = cart.reduce((total, item) => total + item.quantity, 0);


        return {
          subTotal,
          tax,
          total,
          itemsCart
        }
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto exposte en el carrito de la talla seleccionada
        const productInCart = cart.some(item => item.id === product.id && item.size === product.size);

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return;
        }

        // 2. El producto existe por talla, hay que incrementar el quantity
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item;
        })

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity }

          return item;
        })

        set({ cart: updatedCartProducts })
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(item => !(item.id === product.id && item.size === product.size))

        set({ cart: updatedCartProducts })
      },

    })
    , {
      name: 'shopping-cart',
      // skipHydration: true
    }
  )
)