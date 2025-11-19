import { useEffect } from 'react'
import { useRestaurantStore } from '@/store/restaurantStore'

export const useRestaurants = () => {
    const {
        getAllRestaurants,
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

    const restaurants = getAllRestaurants()

    const validRestaurants = restaurants.filter(
        (r) => r.deals && r.deals.length > 0
    )

    return { restaurants: validRestaurants, isLoading, error }
}
