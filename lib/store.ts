import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getSubtotal: () => number
  getTaxAmount: () => number
  getTotalWithTax: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(i => i.id === item.id)
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      getTaxAmount: () => {
        const subtotal = get().getSubtotal()
        return Math.round(subtotal * 0.03 * 100) / 100 // 3% tax, rounded to 2 decimal places
      },
      getTotalWithTax: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTaxAmount()
        return subtotal + tax
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
