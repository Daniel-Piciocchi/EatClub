'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRestaurantById } from '@/hooks'
import { LoadingScreen, Logo } from '@/components/common'
import {
    MenuIcon,
    PhoneIcon,
    AddressIcon,
    LocationIcon,
    HeartIcon,
    ArrowLeftIcon,
    ClockIcon,
} from '@/components/common/Icons'
import { DealCard } from '@/components/restaurant'
import { sortDealsByDiscount } from '@/utils'
import './page.css'

export default function RestaurantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { restaurant, isLoading, error } = useRestaurantById(id)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">Error: {error}</div>
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

    const sortedDeals = sortDealsByDiscount(restaurant.deals)

    return (
        <div className="restaurant-detail-page">
            <div className="detail-logo-header">
                <button
                    onClick={() => router.back()}
                    className="back-button"
                    aria-label="Back"
                >
                    <ArrowLeftIcon />
                </button>
                <Logo />
                <div className="back-button-spacer"></div>
            </div>
            <div className="restaurant-detail-container">
                <div className="restaurant-image-wrapper">
                    <img
                        src={restaurant.imageLink}
                        alt={restaurant.name}
                        className="restaurant-detail-image"
                        onError={(e) => {
                            e.currentTarget.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3EImage unavailable%3C/text%3E%3C/svg%3E'
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

                        <div className="restaurant-detail-divider"></div>
                    </div>

                    {sortedDeals.map((deal, index) => (
                        <div key={deal.objectId}>
                            {index > 0 && (
                                <div className="deal-separator"></div>
                            )}
                            <DealCard deal={deal} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
