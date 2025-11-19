import { create } from 'zustand'
import { Restaurant, RestaurantsApiResponse } from '@/data/types'
import { API_URL } from '@/constants'

interface RestaurantStore {
    restaurants: Restaurant[]
    isLoading: boolean
    error: string | null
    fetchRestaurants: () => Promise<void>
    getRestaurantById: (id: string) => Restaurant | undefined
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
    restaurants: [],
    isLoading: false,
    error: null,

    fetchRestaurants: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(API_URL)
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants')
            }
            const data: RestaurantsApiResponse = await response.json()
            set({ restaurants: data.restaurants, isLoading: false })
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'An error occurred',
                isLoading: false,
            })
        }
    },

    getRestaurantById: (id: string) => {
        return get().restaurants.find(
            (restaurant) => restaurant.objectId === id
        )
    },
}))
