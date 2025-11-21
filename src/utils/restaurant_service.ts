import { API_URL } from '@/constants'
import { Restaurant, RestaurantsApiResponse } from '@/types'

const getBaseUrl = () => {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.VERCEL_URL ??
        'http://localhost:3000'

    return baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`
}

const getRestaurantsUrl = () => {
    if (API_URL.startsWith('http')) {
        return API_URL
    }

    return new URL(API_URL, getBaseUrl()).toString()
}

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
    const response = await fetch(getRestaurantsUrl(), {
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch restaurants')
    }

    const data: RestaurantsApiResponse = await response.json()
    return data.restaurants ?? []
}

export const fetchRestaurantById = async (
    id: string
): Promise<Restaurant | null> => {
    const restaurants = await fetchRestaurants()
    return restaurants.find((restaurant) => restaurant.objectId === id) ?? null
}
