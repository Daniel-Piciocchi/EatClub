import { create } from 'zustand'
import { Restaurant, RestaurantsApiResponse } from '@/types'
import { API_URL } from '@/constants'

interface RestaurantStore {
    restaurantsById: Record<string, Restaurant>
    restaurantIds: string[]
    isLoading: boolean
    error: string | null
    fetchRestaurants: () => Promise<void>
    getRestaurantById: (id: string) => Restaurant | undefined
    getAllRestaurants: () => Restaurant[]
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
    restaurantsById: {},
    restaurantIds: [],
    isLoading: false,
    error: null,

    fetchRestaurants: async () => {
        set({ isLoading: true, error: null })

        // for demo purposes to show what loading screen looks like
        await new Promise((resolve) => setTimeout(resolve, 3000))

        try {
            const response = await fetch(API_URL)
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants')
            }
            const data: RestaurantsApiResponse = await response.json()

            const restaurantsById: Record<string, Restaurant> = {}
            const restaurantIds: string[] = []

            data.restaurants.forEach((restaurant) => {
                restaurantsById[restaurant.objectId] = restaurant
                restaurantIds.push(restaurant.objectId)
            })

            set({
                restaurantsById,
                restaurantIds,
                isLoading: false,
            })
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
        return get().restaurantsById[id]
    },

    getAllRestaurants: () => {
        const { restaurantsById, restaurantIds } = get()
        return restaurantIds.map((id) => restaurantsById[id])
    },
}))
