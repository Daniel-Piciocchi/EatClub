import { useEffect } from 'react'
import { useRestaurantStore } from '@/store/restaurant_store'

export const useRestaurantById = (id: string) => {
    const {
        getRestaurantById,
        isLoading,
        error,
        fetchRestaurants,
        restaurantIds,
    } = useRestaurantStore()

    useEffect(() => {
        if (restaurantIds.length === 0 && !isLoading && !error) {
            fetchRestaurants()
        }
    }, [restaurantIds.length, isLoading, error, fetchRestaurants])

    const restaurant = getRestaurantById(id)

    return { restaurant, isLoading, error }
}
