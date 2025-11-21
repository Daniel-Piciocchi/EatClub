'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
    MenuIcon,
    PhoneIcon,
    AddressIcon,
    LocationIcon,
    HeartIcon,
    ClockIcon,
} from '@/components/common/Icons'
import { Header } from '@/components/common'
import { DealCard } from './DealCard'
import { sortDealsByDiscount } from '@/utils'
import { Restaurant } from '@/types'

interface RestaurantDetailClientProps {
    restaurant: Restaurant
}

export const RestaurantDetailClient = ({
    restaurant,
}: RestaurantDetailClientProps) => {
    const router = useRouter()
    const imgRef = useRef<HTMLImageElement | null>(null)
    const sortedDeals = useMemo(
        () => sortDealsByDiscount(restaurant.deals),
        [restaurant.deals]
    )

    const placeholderSrc =
        'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"200\"%3E%3Crect width=\"400\" height=\"200\" fill=\"%23e5e7eb\"/%3E%3Ctext x=\"50%25\" y=\"50%25\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"%239ca3af\" font-family=\"sans-serif\" font-size=\"14\"%3EImage unavailable%3C/text%3E%3C/svg%3E'

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = restaurant.imageLink || placeholderSrc
        }
    }, [restaurant.imageLink])

    return (
        <div className="restaurant-detail-page">
            <Header showBackButton onBack={() => router.back()} />

            <div className="restaurant-detail-container">
                <div className="restaurant-image-wrapper">
                    <img
                        ref={imgRef}
                        src={placeholderSrc}
                        alt={restaurant.name}
                        className="restaurant-detail-image"
                        onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = placeholderSrc
                        }}
                    />
                </div>

                <div className="restaurant-action-buttons">
                    <button className="action-button" aria-label="View menu">
                        <MenuIcon />
                        <span>Menu</span>
                    </button>
                    <button
                        className="action-button"
                        aria-label="Call restaurant"
                    >
                        <PhoneIcon />
                        <span>Call us</span>
                    </button>
                    <button
                        className="action-button"
                        aria-label="View location"
                    >
                        <LocationIcon />
                        <span>Location</span>
                    </button>
                    <button
                        className="action-button"
                        aria-label="Add to favourites"
                    >
                        <HeartIcon />
                        <span>Favourite</span>
                    </button>
                </div>

                <div className="restaurant-detail-content">
                    <div className="restaurant-detail-header">
                        <h1 className="restaurant-detail-name">
                            {restaurant.name}
                        </h1>

                        <p className="restaurant-detail-cuisines">
                            {restaurant.cuisines.join(' • ')}
                        </p>

                        <div className="restaurant-detail-divider"></div>

                        <div className="restaurant-detail-info">
                            <p className="restaurant-info-text">
                                <ClockIcon className="info-icon" />
                                Hours: {restaurant.open} - {restaurant.close}
                            </p>

                            <p className="restaurant-info-text">
                                <AddressIcon className="info-icon" />
                                {restaurant.address1}, {restaurant.suburb}
                            </p>
                        </div>
                    </div>

                    {sortedDeals.map((deal) => (
                        <div key={deal.objectId}>
                            <div className="deal-separator"></div>
                            <DealCard deal={deal} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
