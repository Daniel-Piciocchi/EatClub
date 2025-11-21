'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RestaurantWithBestDeal } from '@/types'
import { formatDealTime } from '@/utils'
import { FoodPlaceholder } from '@/components/common'
import './RestaurantCard.css'

interface RestaurantCardProps {
    restaurant: RestaurantWithBestDeal
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
    const router = useRouter()
    const [imageFailed, setImageFailed] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleClick = () => {
        router.push(`/restaurant/${restaurant.objectId}`)
    }

    const dealTime = formatDealTime(restaurant.bestDeal)

    const placeholderSrc =
        'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"200\"%3E%3Crect width=\"400\" height=\"200\" fill=\"%23e5e7eb\"/%3E%3Ctext x=\"50%25\" y=\"50%25\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"%239ca3af\" font-family=\"sans-serif\" font-size=\"14\"%3EImage unavailable%3C/text%3E%3C/svg%3E'

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = restaurant.imageLink || placeholderSrc
            setImageFailed(false)
        }
    }, [restaurant.imageLink])

    // Check what dining options are available
    const hasDineIn = restaurant.deals.some((deal) => deal.dineIn === 'true')
    const hasTakeaway = restaurant.deals.some((deal) => deal.dineIn === 'false')

    const getDiningOptions = () => {
        if (hasDineIn && hasTakeaway) {
            return 'Dine In • Takeaway'
        } else if (hasDineIn) {
            return 'Dine In'
        } else if (hasTakeaway) {
            return 'Takeaway'
        }
        return ''
    }

    return (
        <div className="restaurant-card" onClick={handleClick}>
            <div className="restaurant-card-image-container">
                {imageFailed ? (
                    <FoodPlaceholder cuisines={restaurant.cuisines} />
                ) : (
                    <img
                        ref={imgRef}
                        src={placeholderSrc}
                        alt={restaurant.name}
                        className="restaurant-card-image"
                        onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = placeholderSrc
                            setImageFailed(true)
                        }}
                    />
                )}
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

                {getDiningOptions() && (
                    <p className="restaurant-card-dining-options">
                        {getDiningOptions()}
                    </p>
                )}
            </div>
        </div>
    )
}
