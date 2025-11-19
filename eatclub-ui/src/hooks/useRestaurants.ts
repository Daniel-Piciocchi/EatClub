import { useEffect } from 'react'
import { useRestaurantStore } from '@/store/restaurantStore'

export const useRestaurants = () => {
    const { restaurants, isLoading, error, fetchRestaurants } =
        useRestaurantStore()

    useEffect(() => {
        if (restaurants.length === 0 && !isLoading && !error) {
            fetchRestaurants()
        }
    }, [restaurants.length, isLoading, error, fetchRestaurants])

    return { restaurants, isLoading, error }
}
