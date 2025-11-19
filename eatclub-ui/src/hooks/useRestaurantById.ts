import { useEffect } from 'react'
import { useRestaurantStore } from '@/store/restaurantStore'

export const useRestaurantById = (id: string) => {
    const {
        restaurants,
        isLoading,
        error,
        fetchRestaurants,
        getRestaurantById,
    } = useRestaurantStore()

    useEffect(() => {
        if (restaurants.length === 0 && !isLoading && !error) {
            fetchRestaurants()
        }
    }, [restaurants.length, isLoading, error, fetchRestaurants])

    const restaurant = getRestaurantById(id)

    return { restaurant, isLoading, error }
}
