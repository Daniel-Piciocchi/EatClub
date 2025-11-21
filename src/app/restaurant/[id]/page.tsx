import { RestaurantDetailClient } from '@/components/restaurant'
import { fetchRestaurantById } from '@/utils/restaurant-service'
import './page.css'

export default async function RestaurantDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    let restaurant = null
    try {
        restaurant = await fetchRestaurantById(id)
    } catch (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    Failed to load restaurant. Please try again later.
                </div>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="not-found-container">
                <div className="not-found-message">Restaurant not found</div>
            </div>
        )
    }

    return <RestaurantDetailClient restaurant={restaurant} />
}
