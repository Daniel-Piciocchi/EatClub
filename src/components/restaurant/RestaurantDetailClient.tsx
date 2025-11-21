'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    MenuIcon,
    PhoneIcon,
    AddressIcon,
    LocationIcon,
    HeartIcon,
    ClockIcon,
} from '@/components/common/Icons'
import { Header, FoodPlaceholder } from '@/components/common'
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
    const [imageFailed, setImageFailed] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const sortedDeals = useMemo(
        () => sortDealsByDiscount(restaurant.deals),
        [restaurant.deals]
    )

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = restaurant.imageLink ?? ''
            setImageFailed(false)
            setImageLoaded(false)
        }
    }, [restaurant.imageLink])

    const shouldShowImage = !!restaurant.imageLink && !imageFailed
    const showPlaceholder = !restaurant.imageLink || imageFailed || !imageLoaded

    return (
        <div className="restaurant-detail-page">
            <Header showBackButton onBack={() => router.back()} />

            <div className="restaurant-detail-container">
                <div className="restaurant-image-wrapper">
                    {shouldShowImage ? (
                        <img
                            ref={imgRef}
                            src={restaurant.imageLink}
                            alt={restaurant.name}
                            className={`restaurant-detail-image ${
                                imageLoaded
                                    ? 'restaurant-detail-image--visible'
                                    : 'restaurant-detail-image--hidden'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                e.currentTarget.onerror = null
                                setImageFailed(true)
                            }}
                        />
                    ) : null}
                    {showPlaceholder && (
                        <FoodPlaceholder
                            cuisines={restaurant.cuisines}
                            className="restaurant-detail-image restaurant-detail-image--visible"
                        />
                    )}
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
