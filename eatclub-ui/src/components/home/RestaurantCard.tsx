'use client'

import { useRouter } from 'next/navigation'
import { RestaurantWithBestDeal } from '@/data/types'
import { formatDealTime } from '@/utils'
import './RestaurantCard.css'

interface RestaurantCardProps {
    restaurant: RestaurantWithBestDeal
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/restaurant/${restaurant.objectId}`)
    }

    const dealTime = formatDealTime(restaurant.bestDeal)

    return (
        <div className="restaurant-card" onClick={handleClick}>
            <div className="restaurant-card-image-container">
                <img
                    src={restaurant.imageLink}
                    alt={restaurant.name}
                    className="restaurant-card-image"
                    onError={(e) => {
                        e.currentTarget.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3EImage unavailable%3C/text%3E%3C/svg%3E'
                    }}
                />
                <div className="restaurant-card-deal-badge">
                    <span className="restaurant-card-deal-badge-discount">
                        {restaurant.bestDeal.discount}% off
                    </span>
                    <span className="restaurant-card-deal-badge-time">
                        {dealTime}
                    </span>
                </div>
            </div>

            <div className="restaurant-card-content">
                <h2 className="restaurant-card-name">{restaurant.name}</h2>

                <p className="restaurant-card-location">
                    {restaurant.address1}, {restaurant.suburb}
                </p>

                <p className="restaurant-card-cuisines">
                    {restaurant.cuisines.join(', ')}
                </p>
            </div>
        </div>
    )
}
