import { Restaurant } from '@/data/types'

export const filterRestaurants = (
    restaurants: Restaurant[],
    searchQuery: string
): Restaurant[] => {
    if (!searchQuery.trim()) {
        return restaurants
    }

    const query = searchQuery.toLowerCase().trim()

    return restaurants.filter((restaurant) => {
        const nameMatch = restaurant.name.toLowerCase().includes(query)

        const cuisineMatch = restaurant.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(query)
        )

        return nameMatch || cuisineMatch
    })
}
